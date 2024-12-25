import { BrandLogo } from "@/components/BrandLogo";
import { Semester } from "@/components/Semester";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar({ initialSemester }: { initialSemester: string }) {
    return (
        <header className="flex py-4 shadow bg-background">
            <nav className="flex items-center gap-10 container">
                <Link href="/dashboard" className="mr-auto">
                    <BrandLogo />
                </Link>
                <Link href="/subscription">Subscription</Link>
                <Semester initialSemester={initialSemester}/>
                <UserButton />
            </nav>
        </header>
    )
}