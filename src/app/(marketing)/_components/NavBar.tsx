import { BrandLogo } from "@/components/BrandLogo";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar() {
    return <header className="flex py-6 shadow-xl fixed top-0 w-full z-10 bg-background/95">
        <nav className="flex items-center gap-10 container font-semibold">
            <Link href="/" className="mr-auto">
                <BrandLogo />
            </Link>
            {/* <SignedIn>
                <Link href="/dashboard">Dashboard</Link>
                <SignOutButton>Sign Out</SignOutButton>
            </SignedIn>
            <SignedOut>
                <SignInButton>Login</SignInButton>
            </SignedOut> */}
        </nav>
    </header>
}