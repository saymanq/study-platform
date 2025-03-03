"use client"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";

export function NoProducts() {
    return (
        <div className="mt-8 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-900/80 rounded-xl border border-violet-500/30 
                  shadow-lg shadow-violet-500/10 backdrop-blur-sm overflow-hidden
                  max-w-md w-full p-8">
                <div className="p-1 bg-gradient-to-r from-violet-800 to-indigo-700 rounded-lg mb-6">
                    <h3 className="text-white font-medium text-center py-1">Get Started</h3>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full 
                          bg-gradient-to-br from-violet-800/50 to-indigo-600/30 mb-6
                          shadow-inner shadow-violet-500/20 border border-violet-500/20">
                        <BookIcon className="h-12 w-12 text-violet-100" />
                    </div>

                    <h2 className="text-2xl font-semibold text-white mb-3">No courses yet</h2>

                    <p className="text-violet-200/70 max-w-sm mb-8">
                        You haven't added any courses for this semester. Add your first course to get started.
                    </p>

                    <Button className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 
                          text-white hover:from-violet-600 hover:to-indigo-500 
                          border border-violet-500/30 shadow-md shadow-violet-800/20
                          transition-all duration-300 py-6">
                        <PlusIcon className="mr-2 h-5 w-5" />
                        Add Your First Course
                    </Button>
                </div>
            </div>
        </div>
    );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}