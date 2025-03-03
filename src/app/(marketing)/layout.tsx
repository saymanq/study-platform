import { ReactNode } from 'react';
import { NavBar } from './_components/NavBar';

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="selection:bg-[hsl(320,65%,52%,20%)] bg-newbg min-h-screen">
            <NavBar />
            <main className="pt-16 md:pt-20">
                {children}
            </main>

            {/* Optional subtle animated particles */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-particle floating-animation"
                        style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 10 + 15}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}