import { auth, clerkClient } from "@clerk/nextjs/server";
import Courses from "./_components/Courses";
import { getCourses } from "@/server/db/courses";
import { NoProducts } from "./_components/NoProducts";
import { DashboardHeader } from "./_components/DashboardHeader";

export default async function DashboardPage() {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) {
        return redirectToSignIn()
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId);
    const firstName = user?.firstName || "Student";
    const currentSemester = (user?.publicMetadata?.currentSemester as string) || "UnknownSemester";

    const courses = await getCourses(userId, { limit: 6, semester: currentSemester });

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 py-8">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                <div className="bg-slate-900/80 rounded-xl border border-violet-500/30 
                    shadow-lg shadow-violet-500/10 backdrop-blur-sm p-6 mb-6">
                    <DashboardHeader
                        firstName={firstName}
                        semester={currentSemester !== "UnknownSemester" ? currentSemester : undefined}
                    />
                </div>

                {courses.length === 0 ? (
                    <NoProducts />
                ) : (
                    <Courses courses={courses} />
                )}
            </div>
        </div>
    )
}