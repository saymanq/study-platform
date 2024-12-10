'use server'

import { env } from "@/data/env/server";
import { db } from "@/drizzle/db";
import { CourseFiles } from "@/drizzle/schema";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { auth } from "@clerk/nextjs/server";
import { count, sql } from "drizzle-orm";


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

    const fileNumber = (result?.value ?? 0) + 1;
    const extension = file.name.split('.').pop();
    const R2Name = `${userId}/bigfiles/${courseId}/file${fileNumber}.${extension}`
    await addFileToR2(file, R2Name)

    // Insert file details into database
    await db.insert(CourseFiles).values({
        clerkUserID: userId,
        courseId: courseId,
        fileName: file.name,
        //R2Name: `file${fileNumber}.${extension}`,
        R2Name: `file${fileNumber}.txt`,
    });   
}