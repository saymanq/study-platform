import { db } from "@/drizzle/db";
import { CourseFiles } from "@/drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

export function getFileCount(userId: string, courseID: string, semesterr: string) {
    return db.select({ count: sql`count(*)` })
        .from(CourseFiles)
        .where(and(
            eq(CourseFiles.clerkUserID, userId),
            eq(CourseFiles.courseId, courseID),
            eq(CourseFiles.semester, semesterr)
        ));
}