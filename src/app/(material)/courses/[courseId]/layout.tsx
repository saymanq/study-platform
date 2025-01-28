
import { NavBar } from "./_components/NavBar"

export default function CourseHomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-newbg min-h-screen">
            <NavBar />
            <div className="max-w-full mx-auto py-6 px-4">
                {children}
            </div>
        </div>
    )

}