'use server'

import { env } from "@/data/env/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getFileById } from "../db/coursefiles";

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
    // Add checksum configuration to prevent compatibility issues
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
});

export async function getFileUrl(fileId: string, userId: string) {
    try {
        const file = await getFileById(fileId, userId);
        if (!file) return null;

        const currentSemester = file.semester;
        const R2Path = `${userId}/${currentSemester}/bigfiles/${file.courseId}/${file.R2Name}.pdf`;

        const command = new GetObjectCommand({
            Bucket: env.CLOUDFLARE_BUCKET_NAME,
            Key: R2Path,
        });

        const url = await getSignedUrl(s3Client , command, { expiresIn: 3600 });
        return url;
    } catch (error) {
        console.error("Error getting file URL:", error);
        return null;
    }
}