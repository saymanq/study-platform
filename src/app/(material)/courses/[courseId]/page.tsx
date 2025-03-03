import { getCourse } from "@/server/db/courses";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { NoFiles } from "./_components/NoFiles";
import { getFileCount } from "@/server/db/coursefiles";
import { CourseInfo } from "./_components/CourseInfo";
import { CourseFilesList } from "./_components/CourseFiles";
import { BookOpen } from "lucide-react";

export default async function CourseHome(
    props: {
        params: Promise<{ courseId: string }>
    }
) {

    const params = await props.params;
    const { userId, redirectToSignIn } = await auth();
    if (userId == null) return redirectToSignIn();

    const course = await getCourse(params.courseId, userId);
    if (course == null) return notFound();

    const client = await clerkClient()
    const user = await client.users.getUser(userId);
    const currentSemester = (user?.publicMetadata?.currentSemester as string) || "Unknown Semester";
    const formattedSemester = currentSemester.replace(/\s+/g, '');

    const fileCount = await getFileCount(userId, params.courseId, formattedSemester);
    
    if (Number(fileCount[0].count) === 0) {
        return (
            <div className="relative min-h-screen bg-gradient-to-br from-violet-950 to-slate-900 p-4 md:p-6">
                <NoFiles courseId={params.courseId} />
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-violet-950 to-slate-900 p-4 md:p-6">
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 min-h-[calc(100vh-3rem)]">

                {/* Course Info */}
                <div className="lg:col-span-3 bg-slate-900/80 rounded-xl border border-violet-500/30 
                    shadow-lg shadow-violet-500/10 backdrop-blur-sm overflow-hidden
                    transition-all duration-300 ease-in-out hover:shadow-violet-500/20">
                    <div className="p-1 bg-gradient-to-r from-violet-800 to-indigo-700 flex items-center justify-center">
                        <h3 className="text-white font-medium text-center text-sm">Course Information</h3>
                    </div>
                    <div className="p-6">
                        <CourseInfo courseId={params.courseId} userId={userId} semester={formattedSemester} />
                    </div>
                </div>

                {/* Course Files */}
                <div className="lg:col-span-1 bg-slate-900/80 rounded-xl border border-violet-500/30 
                    shadow-lg shadow-violet-500/10 backdrop-blur-sm overflow-hidden
                    transition-all duration-300 ease-in-out hover:shadow-violet-500/20">
                    <div className="p-1 bg-gradient-to-r from-violet-800 to-indigo-700 flex items-center justify-center">
                        <h3 className="text-white font-medium text-center text-sm">Course Files</h3>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-center mb-4 bg-slate-800/30 p-3 rounded-lg border border-violet-500/10">
                            <div className="mr-3 bg-violet-800/50 p-2 rounded-full">
                                <BookOpen size={18} className="text-violet-200" />
                            </div>
                            <div className="text-center">
                                <h1 className="text-xl font-semibold text-white">{course.c_abbrev} {course.c_num}</h1>
                                <p className="text-xs text-violet-300">{course.name}</p>
                            </div>
                        </div>
                        <div className="my-4">
                            <hr className="border-t border-violet-500/30" />
                        </div>
                        <div className="max-h-[calc(100vh-14rem)] overflow-y-auto px-1 pb-1">
                            <CourseFilesList courseId={params.courseId} userId={userId} semester={formattedSemester} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}