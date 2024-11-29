import { getCourse } from "@/server/db/courses";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function CourseHome({
    params,
} : {
    params: { courseId: string }
}) {
    const { userId, redirectToSignIn } = await auth();
    if (userId == null) return redirectToSignIn();

    // const courseId = params.courseId;
    const course = await getCourse(params.courseId, userId);
    if (course == null) return notFound();

    return (
        <div>
            <h1>{course.c_abbrev} {course.c_num}</h1>
            <p>{course.name}</p>
        </div>
    )

}