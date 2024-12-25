import { auth, clerkClient } from "@clerk/nextjs/server";
import { NavBar } from "./_components/NavBar"
import { semesters } from "@/data/semesters";

function getCurrentSemester(): string {
    const now = new Date();
    
    for (const semester of semesters.semesters) {
      const startDate = new Date(semester.startDate);
      const endDate = new Date(semester.endDate);
      
      if (now >= startDate && now <= endDate) {
        return semester.name;
      }
    }

    // If not found in predefined semesters, return a default value
    return "Unknown Semester";
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth();
    let currentSemester = getCurrentSemester();

    if (userId) {
        const client = await clerkClient()
        const user = await client.users.getUser(userId);
        currentSemester = (user?.publicMetadata?.currentSemester as string) || currentSemester;
    }
    
    return (
        <div className="bg-accent/5 min-h-screen">
            <NavBar initialSemester={currentSemester}/>
            <div className="container py-6">
                {children}
            </div>
        </div>
    )

}