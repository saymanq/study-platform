import { db } from "@/drizzle/db";
import { Courses } from "@/drizzle/schema";

export function getCourses(userId: string, { limit }: { limit?: number}) {
    return db.query.Courses.findMany({
        where: (({ clerkUserID }, {eq}) => eq(clerkUserID, userId)),
        orderBy: (({c_abbrev}, {asc}) => asc(c_abbrev)),
        limit,
    })
}

export function getCourse(courseId: string, userId: string) {
    return db.query.Courses.findFirst({
        where: (({ id, clerkUserID }, {eq, and}) => and(eq(id, courseId), eq(clerkUserID, userId))),
    })
}

export async function addCourse(data: typeof Courses.$inferInsert) {
    const [newCourse] = await db.insert(Courses).values(data).returning({ id: Courses.id})
    return newCourse
}