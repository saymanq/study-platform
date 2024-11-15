import { BrandLogo } from "@/components/BrandLogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar() {
    return (
        <header className="flex py-4 shadow bg-background">
            <nav className="flex items-center gap-10 container">
                <Link href="/dashboard" className="mr-auto">
                    <BrandLogo />
                </Link>
                <Link href="/subscription">Subscription</Link>
                <UserButton />
            </nav>
        </header>
    )
}