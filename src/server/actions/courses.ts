"use server"

import { coursesSchema } from "@/schemas/courses";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { addCourse as addCourseDb } from "@/server/db/courses";
import { redirect } from "next/navigation";
import { uAlbertaCourses } from "@/data/uAlbertaCourses";
import { getCurrentSemester } from "@/lib/utils";

export async function addCourse(unsafeData: z.infer<typeof coursesSchema>): Promise<{ error: boolean, message: string } | undefined> {
    const { userId } = await auth()
    if (!userId) {
        return { error: true, message: "Authentication required" }
    }
    const { success, data } = coursesSchema.safeParse(unsafeData)
    const client = await clerkClient()
    const user = await client.users.getUser(userId);
    const currentSemester = (user?.publicMetadata?.currentSemester as string) || getCurrentSemester();
    //const currentSemester = useSemesterStore.getState().currentSemester;
    const formattedSemester = currentSemester.replace(/\s+/g, '');

    // If this is the user's first course, also set their semester metadata
    if (!user?.publicMetadata?.currentSemester) {
        await client.users.updateUser(userId, {
            publicMetadata: {
                currentSemester: currentSemester
            }
        });
    }
    
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

    const { id } = await addCourseDb({ ...data, c_num: data.c_num, clerkUserID: userId, name: courseName, semester:formattedSemester })
    redirect(`/courses/${id}`)
}