import { db } from "@/drizzle/db";
import { CourseSummary } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export function addFirstCourseSummary(userId: string, courseId: string, semester: string, summary: Array<{topic: string, summary: string}>, topics: Array<string>, overall_summary: string) {
    const formattedSummary = summary.map(item => ({
        title: item.topic,
        content: item.summary
    }));
    console.log(formattedSummary);
    return db.insert(CourseSummary).values({
        clerkUserID: userId,
        courseId: courseId,
        semester: semester,
        summary: formattedSummary,
        titles: topics,
        overallsummary: overall_summary,
    })
}

export function getCSummary(courseId: string, userId: string, semester: string) {
    return db.select({ summary: CourseSummary.summary, overallSummary: CourseSummary.overallsummary })
        .from(CourseSummary)
        .where(and(
            eq(CourseSummary.courseId, courseId),
            eq(CourseSummary.clerkUserID, userId),
            eq(CourseSummary.semester, semester)
        )).execute();
}
