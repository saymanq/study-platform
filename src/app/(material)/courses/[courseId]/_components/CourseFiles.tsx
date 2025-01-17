import { Card } from "@/components/ui/card";
import { getCourseFiles } from "@/server/db/coursefiles";
import Link from "next/link";

type CourseFilesProps = {
    courseId: string;
    userId: string;
    semester: string;
}

export async function CourseFilesList({ courseId, userId, semester }: CourseFilesProps) {
    const files = await getCourseFiles(courseId, userId, semester);
    
    return (
        <div className="space-y-4">
            {files.map((file) => (
                <Link key={file.id} href={`/courses/${courseId}/files/${file.id}`}>
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex flex-col">
                            <h3 className="font-medium">{file.fileName}</h3>
                            <p className="text-sm text-muted-foreground">
                                {new Date(file.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
}