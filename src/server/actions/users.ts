'use server';
import { auth } from "@clerk/nextjs/server"
import { getUserCreatedAtDB } from "../db/users"

export async function getUserCreatedAt() {
    const { userId } = await auth()
        
    if (!userId) {
        throw new Error("User not authenticated")
    }

    // Get user creation date
    const userCreatedDate = await getUserCreatedAtDB(userId)
    return userCreatedDate
}