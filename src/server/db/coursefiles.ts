import { db } from "@/drizzle/db";
import { CourseFiles, CourseFilesSummary } from "@/drizzle/schema";
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

export function getCourseFiles( courseID: string, userId: string, semesterr: string) {
    return db.query.CourseFiles.findMany({
        where: (({ clerkUserID, courseId, semester }, { eq, and }) =>
            and(
                eq(clerkUserID, userId),
                eq(courseId, courseId),
                eq(semester, semesterr)
            )
        ),
        orderBy: (({ createdAt }, { desc }) => desc(createdAt))
    })
}

export function getFileById(fileId: string, userId: string) {
    return db.query.CourseFiles.findFirst({
        where: (({ id, clerkUserID }, { eq, and }) =>
            and(
                eq(id, fileId),
                eq(clerkUserID, userId)
            )
        ),
    });
}

export function getFData(courseId: string, userId: string, semester: string) {
    return db.select({ fileSummary: CourseFilesSummary.fileSummary, overallFileSummary: CourseFilesSummary.overallSummary })
        .from(CourseFilesSummary)
        .where(and(
            eq(CourseFilesSummary.courseId, courseId),
            eq(CourseFilesSummary.clerkUserID, userId),
            eq(CourseFilesSummary.semester, semester)
        )).execute();
}