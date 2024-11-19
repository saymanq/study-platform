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