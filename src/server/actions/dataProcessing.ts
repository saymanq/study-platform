'use server'

import { env } from "@/data/env/server";
import { db } from "@/drizzle/db";
import { CourseFiles, VectorData } from "@/drizzle/schema";
import { getCurrentSemester } from "@/lib/utils";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { count, sql } from "drizzle-orm";
import { addFirstCourseSummary } from "../db/courseSummary";
import { revalidatePath } from "next/cache";

interface VectorMatch {
    id: string;
    title: string;
}

interface TopicSummary {
    topic: string;
    summary: string;
}


async function getTopicSummary(userId: string, semester: string, courseId: string, filename: string, topic: string) {
    try {
        const response1 = await fetch(`https://api.vectorsquery.sayman.me/vector/${userId}/${semester}/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: filename,
                query: topic,
                action: 'courseaction'
            })
        });

        if (!response1.ok) {
            throw new Error(`HTTP error! status: ${response1.status}`);
        }

        const data1 = await response1.json();
        
        const contextStrings = await Promise.all(
            data1.matches.map(async (match: VectorMatch) => {
                const [vectorText] = await db
                    .select({ text: VectorData.text })
                    .from(VectorData)
                    .where(sql`vector_id = ${match.id}`);
                console.log('vectorText:', vectorText.text);
                return `<context><title>${match.title}</title><text>${vectorText?.text || ''}</text></context>`;
            })
        );

        // Join all context strings with newlines
        const context = contextStrings.join('\n\n');

        const response2 = await fetch(`https://api.vectorsquery.sayman.me/llama/summarizetopic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: topic,
                context: context,
            })
        });

        if (!response2.ok) {
            throw new Error(`HTTP error! status: ${response2.status}`);
        }

        const data2 = await response2.json();

        return data2.response;
    } catch (error) {
        console.error('Error in getSummary:', error);
        throw error;
    }
}


async function getCourseSummary(courseSummary: TopicSummary[]) {
    try {
        const response = await fetch('https://api.vectorsquery.sayman.me/llama/summarizecourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                summaryJSON: courseSummary,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.response;
    } catch (error) {
        console.error('Error in getCourseSummary:', error);
        throw error;
    }
}

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  });

async function addFileToR2(file: File, filename: string) {
    const Key = filename;
    const Bucket = env.CLOUDFLARE_BUCKET_NAME;


    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const parallelUploads = new Upload({
        client: s3Client,
        params: {
            Bucket,
            Key,
            Body: buffer,
            ContentType: file.type,
        },
        queueSize: 4,
        leavePartsOnError: false,
        });

        await parallelUploads.done()
        return { success: true }
    } catch (error) {
        console.error("R2 upload error:", error)
        throw error
    }
}

export async function dataProcessing(file: File, courseId: string) {
    const { userId } = await auth()
    
    if (!userId) {
        throw new Error("User not authenticated")
    }

    // Get current file count for this user and course
    const [result] = await db
        .select({ value: count() })
        .from(CourseFiles)
        .where(sql`clerk_user_id = ${userId} AND course_id = ${courseId}`);

    let currentSemester = getCurrentSemester();
    const client = await clerkClient()
    const user = await client.users.getUser(userId);
    currentSemester = (user?.publicMetadata?.currentSemester as string) || currentSemester;
    const formattedSemester = currentSemester.replace(/\s+/g, '');

    const fileNumber = (result?.value ?? 0) + 1;
    const extension = file.name.split('.').pop();
    const R2Name = `${userId}/${formattedSemester}/bigfiles/${courseId}/file${fileNumber}.${extension}`
    await addFileToR2(file, R2Name)

    // Insert file details into database
    await db.insert(CourseFiles).values({
        clerkUserID: userId,
        courseId: courseId,
        fileName: file.name,
        //R2Name: `file${fileNumber}.${extension}`,
        R2Name: `file${fileNumber}`,
        semester: formattedSemester,
        status: "Private",
        type: "LectureSlides",
    });
    const fullPath = `study/extract/${R2Name}`;
    console.log('fullPath:', fullPath);
    try {
        const response = await fetch('https://nvlhdnl4cot5npd7eeg5ztj3pu0ogzgt.lambda-url.ca-central-1.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: fullPath,
            })
        });

        const data = await response.json();

        if (data.response_code == 404) {
            console.error('Error: ', await data.ranked_topics_w_subtopics);
            // Don't throw error here to avoid affecting the upload success
        }

        if (data.response_code == 200) {
            const topics = data.ranked_topics_w_subtopics;
            const courseSummary = [];

            for (const topic of topics) {
                try {
                    const summaryText = await getTopicSummary(userId, formattedSemester, courseId, `file${fileNumber}`, topic);
                    courseSummary.push({
                        topic: topic,
                        summary: summaryText,
                    })
                } catch (error) {
                    console.error('Error getting summary:', error);
                    // Don't throw error here to avoid affecting the upload success
                }
            }
            console.log('courseSummary:', courseSummary);

            const cSummaryText = await getCourseSummary(courseSummary);
            console.log('cSummaryText:', cSummaryText);

            try {
                await addFirstCourseSummary(userId, courseId, formattedSemester, courseSummary, topics, cSummaryText);
                console.log('Course summary added successfully');
                revalidatePath(`/courses/${courseId}`);
            } catch (error) {
                console.error('Error adding course summary:', error);
            }
        }
    } catch (error) {
        console.error('Error calling Lambda function:', error);
        // Don't throw error here to avoid affecting the upload success
    }


}