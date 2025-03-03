// src/app/dashboard/_components/DashboardHeader.tsx
import { CalendarIcon } from "@radix-ui/react-icons";

interface DashboardHeaderProps {
    firstName: string;
    semester?: string;
}

export function DashboardHeader({ firstName, semester }: DashboardHeaderProps) {
    const now = new Date();
    const hours = now.getHours();

    let greeting = "Good morning";
    if (hours >= 12 && hours < 17) greeting = "Good afternoon";
    if (hours >= 17) greeting = "Good evening";

    return (
        <div>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        {greeting}, {firstName}
                    </h1>

                    <p className="text-violet-200/70">
                        Here's an overview of your current courses and progress.
                    </p>
                </div>

                {semester && (
                    <div className="inline-flex items-center rounded-md bg-violet-600/20 px-4 py-2 text-sm font-medium text-violet-200 border border-violet-500/30 shadow-inner shadow-violet-500/10">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Current semester: <span className="font-semibold ml-1">{semester}</span>
                    </div>
                )}
            </div>
        </div>
    );
}