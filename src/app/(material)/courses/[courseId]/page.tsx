import { getCourse } from "@/server/db/courses";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { NoFiles } from "./_components/NoFiles";
import { getFileCount } from "@/server/db/coursefiles";
import { CourseInfo } from "./_components/CourseInfo";
import  { CourseFilesList } from "./_components/CourseFiles";


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
        <div className="grid grid-cols-4 gap-8 w-full min-h-screen mx-auto">
            
            {/* Course Info */}
            <div className="col-span-3 bg-card/100 rounded-2xl py-4 px-3 border-2 border-black">
                <CourseInfo courseId={params.courseId} userId={userId} semester={formattedSemester} />
            </div>

            {/* Course Files */}
            <div className="col-span-1 bg-card/100 rounded-2xl py-4 px-3 border-2 border-black">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-xl font-semibold">{course.c_abbrev} {course.c_num}</h1>
                    <p className="text-xs">{course.name}</p>
                </div>
                <div>
                    <hr className="border-t-2 border-black my-4" />
                </div>
                <div>
                    <CourseFilesList courseId={params.courseId} userId={userId} semester={formattedSemester} />
                </div>
            </div>
            
        </div>
    )
}