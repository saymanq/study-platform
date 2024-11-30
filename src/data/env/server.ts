import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    emptyStringAsUndefined: true,
    server: {
        DATABASE_URL: z.string().url(),
        CLERK_SECRET_KEY: z.string(),
        CLERK_WEBHOOK_SECRET: z.string(),
        CLOUDFLARE_ACCOUNT_ID: z.string(),
        CLOUDFLARE_ACCESS_KEY_ID: z.string(),
        CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
        CLOUDFLARE_BUCKET_NAME: z.string(),
    },
    experimental__runtimeEnv: process.env,
})