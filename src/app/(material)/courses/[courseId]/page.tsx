import { getCourse } from "@/server/db/courses";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { NoFiles } from "./_components/NoFiles";

export default async function CourseHome(
    props: {
        params: Promise<{ courseId: string }>
    }
) {
    const params = await props.params;
    const { userId, redirectToSignIn } = await auth();
    if (userId == null) return redirectToSignIn();

    // const courseId = params.courseId;
    const course = await getCourse(params.courseId, userId);
    if (course == null) return notFound();

    return (
        <div>
            <div>
                <NoFiles courseId={params.courseId}/>
            </div>
            <h1>{course.c_abbrev} {course.c_num}</h1>
            <p>{course.name}</p>
        </div>
    )
}