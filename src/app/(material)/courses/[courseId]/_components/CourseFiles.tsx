import { Card } from "@/components/ui/card";
import { getCourseFiles } from "@/server/db/coursefiles";
import Link from "next/link";
import { FileIcon } from "lucide-react";

type CourseFilesProps = {
    courseId: string;
    userId: string;
    semester: string;
}

export async function CourseFilesList({ courseId, userId, semester }: CourseFilesProps) {
    const files = await getCourseFiles(courseId, userId, semester);

    if (files.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-violet-300/80">No files uploaded yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {files.map((file) => (
                <Link key={file.id} href={`/courses/${courseId}/files/${file.id}`}>
                    <Card className="bg-slate-800/40 border-violet-500/20 hover:border-violet-400/40 p-4 hover:shadow-md hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer group overflow-hidden">
                        <div className="flex items-start space-x-3 w-full">
                            <div className="text-violet-400 mt-1 group-hover:text-violet-300 transition-colors flex-shrink-0">
                                <FileIcon size={18} />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <h3 className="font-medium text-violet-100 group-hover:text-white transition-colors line-clamp-1 overflow-hidden text-ellipsis">{file.fileName}</h3>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-xs text-violet-300/70">
                                        {new Date(file.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <span className="text-xs bg-violet-800/50 text-violet-200 px-2 py-0.5 rounded-full flex-shrink-0">View</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
}