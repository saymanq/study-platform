import { BrandLogo } from "@/components/BrandLogo";
import { Semester } from "@/components/Semester";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar({ initialSemester }: { initialSemester: string }) {
    return (
        <header className="border-b border-violet-500/20 shadow-md shadow-violet-500/5 bg-slate-900/95 backdrop-blur-sm">
            <nav className="flex items-center gap-10 container py-4">
                <Link href="/dashboard" className="mr-auto text-white">
                    <BrandLogo />
                </Link>
                <Link href="/subscription" className="text-violet-100 hover:text-white transition">Subscription</Link>
                <div className="text-white">
                    <Semester initialSemester={initialSemester} />
                </div>
                <UserButton />
            </nav>
        </header>
    )
}