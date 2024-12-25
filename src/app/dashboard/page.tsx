import { auth } from "@clerk/nextjs/server";
import Courses from "./_components/Courses";
import { getCourses } from "@/server/db/courses";
import { NoProducts } from "./_components/NoProducts";
import { useSemesterStore } from "@/store/semesterStore";



export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
    
    const { userId, redirectToSignIn } = await auth()
    const currentSemester = useSemesterStore.getState().currentSemester;

    if (!userId) {
        return redirectToSignIn()
    }

    const courses = await getCourses(userId, { limit: 6, semester: currentSemester, cache: 'no-store' });

    if (courses.length === 0) {
        return (
            <NoProducts />
        )
    }
    
    return (
        <Courses courses={courses}/>
    )
}