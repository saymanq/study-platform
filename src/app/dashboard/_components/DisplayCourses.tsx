import { Card } from "@/components/ui/card";
import Link from "next/link";

export function DisplayCourses({
        courses,
    }: { 
        courses: {
            c_abbrev: string;
            c_num: number;
            name: string;
            id: string;
            clerkUserID: string;
            createdAt: Date;
        }[] }) {
    return (
        <div className="grid gap-3">
            {courses.map(course => (
                <Link href={`/courses/${course.id}`} key={course.id} >
                    <Card 
                        className="p-4 flex items-center justify-center h-[100px] cursor-pointer hover:opacity-75 transition"
                    >
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-xl underline underline-offset-2">{course.c_abbrev} {course.c_num}</p>
                            <p className="font-semibold">{course.name}</p>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}