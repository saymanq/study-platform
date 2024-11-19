import { auth } from "@clerk/nextjs/server";
import Courses from "./_components/Courses";
import { getCourses } from "@/server/db/courses";
import { NoProducts } from "./_components/NoProducts";

export default async function DashboardPage() {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) {
        return redirectToSignIn()
    }

    const courses = await getCourses(userId, { limit: 6 });

    if (courses.length === 0) {
        return (
            <NoProducts />
        )
    }
    
    return (
        <Courses courses={courses}/>
    )
}