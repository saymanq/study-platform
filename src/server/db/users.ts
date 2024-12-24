import { db } from "@/drizzle/db";
import { Courses, UserSubscriptionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export function deleteUser(clerkUserID: string) {
    return db.batch([
        db
            .delete(UserSubscriptionTable)
            .where(eq(UserSubscriptionTable.clerkUserID, clerkUserID)),
        db
            .delete(Courses)
            .where(eq(Courses.clerkUserID, clerkUserID)),
        ])
}

export function getUserCreatedAtDB(clerkUserID: string) {
    // Get user creation date
    return db
        .select({ createdAt: UserSubscriptionTable.createdAt })
        .from(UserSubscriptionTable)
        .where(eq(UserSubscriptionTable.clerkUserID, clerkUserID))
        .limit(1);
}