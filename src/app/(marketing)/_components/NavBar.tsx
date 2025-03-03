'use client'
import { BrandLogo } from "@/components/BrandLogo";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { NotificationButton } from './NotificationButton';

export function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <BrandLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink href="/features">Features</NavLink>
                        <NavLink href="/pricing">Pricing</NavLink>

                        {/* Dropdown Example */}
                        <div className="relative group">
                            <button className="flex items-center text-slate-300 hover:text-white transition-colors font-medium">
                                Resources
                                <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <div className="absolute left-0 mt-2 w-48 rounded-md overflow-hidden bg-slate-800 border border-slate-700 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 shadow-xl">
                                <Link href="/docs" className="block py-2.5 px-4 text-sm text-slate-300 hover:bg-violet-600 hover:text-white transition-colors">
                                    Documentation
                                </Link>
                                <Link href="/blog" className="block py-2.5 px-4 text-sm text-slate-300 hover:bg-violet-600 hover:text-white transition-colors">
                                    Blog
                                </Link>
                                <Link href="/tutorials" className="block py-2.5 px-4 text-sm text-slate-300 hover:bg-violet-600 hover:text-white transition-colors">
                                    Tutorials
                                </Link>
                            </div>
                        </div>

                        <NavLink href="/about">About</NavLink>
                    </nav>

                    {/* Authentication Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <SignedIn>
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 rounded-lg text-white font-medium bg-slate-800 opacity-50 cursor-not-allowed pointer-events-none transition-colors"
                                aria-disabled="true"
                            >
                                Dashboard
                            </Link>
                            <SignOutButton>
                                <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </SignedIn>
                        <SignedOut>
                            <NotificationButton className="px-4 py-2 rounded-lg text-white font-medium hover:bg-slate-800 transition-colors">
                                Log In
                            </NotificationButton>
                            <NotificationButton className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg shadow-violet-900/20">
                                Sign Up
                            </NotificationButton>
                        </SignedOut>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-900 border-t border-slate-800">
                    <div className="py-3 px-4 space-y-1">
                        <MobileNavLink href="/features" onClick={() => setMobileMenuOpen(false)}>Features</MobileNavLink>
                        <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
                        <MobileNavLink href="/docs" onClick={() => setMobileMenuOpen(false)}>Documentation</MobileNavLink>
                        <MobileNavLink href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</MobileNavLink>
                        <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
                    </div>

                    {/* Authentication Buttons - Mobile */}
                    <div className="border-t border-slate-800 py-4 px-4 space-y-3">
                        <SignedIn>
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full py-2.5 text-center rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <SignOutButton>
                                <button className="block w-full py-2.5 text-center rounded-lg border border-slate-700 text-white font-medium hover:bg-slate-800 transition-colors">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </SignedIn>
                        <SignedOut>
                            <NotificationButton className="block w-full py-2.5 text-center rounded-lg border border-slate-700 text-white font-medium hover:bg-slate-800 transition-colors">
                                Log In
                            </NotificationButton>
                            <NotificationButton className="block w-full py-2.5 text-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium transition-all">
                                Sign Up
                            </NotificationButton>
                        </SignedOut>
                    </div>
                </div>
            )}
        </header>
    );
}

interface NavLinkProps {
    href: string;
    children: ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="text-slate-300 hover:text-white transition-colors font-medium"
        >
            {children}
        </Link>
    );
}

interface MobileNavLinkProps {
    href: string;
    onClick: () => void;
    children: ReactNode;
}

function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block py-2.5 px-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors font-medium"
        >
            {children}
        </Link>
    );
}