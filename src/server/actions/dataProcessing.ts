'use server'

import { env } from "@/data/env/server";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { auth } from "@clerk/nextjs/server";


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

    const R2Name = `${userId}/bigfiles/${courseId}/${file.name}`
    await addFileToR2(file, R2Name)
}