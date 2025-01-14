import { auth, clerkClient } from "@clerk/nextjs/server";
import { NavBar } from "./_components/NavBar"
import { getCurrentSemester } from "@/lib/utils";


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