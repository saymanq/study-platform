"use server"

import { coursesSchema } from "@/schemas/courses";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { addCourse as addCourseDb } from "@/server/db/courses";
import { redirect } from "next/navigation";
import { uAlbertaCourses } from "@/data/uAlbertaCourses";

export async function addCourse(unsafeData: z.infer<typeof coursesSchema>): Promise<{ error: boolean, message: string } | undefined> {
    const { userId } = await auth()
    const { success, data } = coursesSchema.safeParse(unsafeData)
    
    if (!success || !userId || data.c_num === null) {
        return { error: true, message:"There was a problem creating the course"}
    }

    const { c_abbrev, c_num } = data
    const courseName = uAlbertaCourses[c_abbrev as keyof typeof uAlbertaCourses]?.find(
        course => course.c_num === c_num
      )?.name || null

    if (!courseName) {
        return { error: true, message: "The course information entered is invalid" }
    }

    const { id } = await addCourseDb({ ...data, c_num: data.c_num, clerkUserID: userId, name: courseName })
    redirect(`/courses/${id}`)
}