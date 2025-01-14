import { getCourse } from "@/server/db/courses";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { NoFiles } from "./_components/NoFiles";
import { getFileCount } from "@/server/db/coursefiles";
import { CourseSummary } from "./_components/CourseSummary";


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

    const client = await clerkClient()
    const user = await client.users.getUser(userId);
    const currentSemester = (user?.publicMetadata?.currentSemester as string) || "Unknown Semester";
    const formattedSemester = currentSemester.replace(/\s+/g, '');

    const fileCount = await getFileCount(userId, params.courseId, formattedSemester);
    console.log(fileCount);
    if (Number(fileCount[0].count) === 0) {
        return (
            <div>
                <NoFiles courseId={params.courseId}/>
            </div>
        )
    }

    return (
        <div>
            <h1>{course.c_abbrev} {course.c_num}</h1>
            <p>{course.name}</p>
            <CourseSummary courseId={params.courseId} userId={userId} semester={formattedSemester} />
        </div>
    )
}