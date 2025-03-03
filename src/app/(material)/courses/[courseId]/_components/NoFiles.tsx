import { UploadFile } from "./UploadFile";
// Fix import by using DocumentIcon which exists in the heroicons package
import { DocumentIcon } from "@heroicons/react/24/outline";

type NoFilesProps = {
    courseId: string
}

export function NoFiles({ courseId }: NoFilesProps) {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="bg-slate-900/80 rounded-xl border border-violet-500/30 
          shadow-lg shadow-violet-500/10 backdrop-blur-sm overflow-hidden
          max-w-xl w-full">
                <div className="p-1 bg-gradient-to-r from-violet-800 to-indigo-700">
                    <h3 className="text-white font-medium text-center py-1">Course Files</h3>
                </div>

                <div className="p-6 flex flex-col items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full 
                bg-gradient-to-br from-violet-800/50 to-indigo-600/30 mb-6
                shadow-inner shadow-violet-500/20 border border-violet-500/20">
                        <DocumentIcon className="h-8 w-8 text-violet-100" />
                    </div>

                    <h2 className="text-2xl font-semibold mb-3 text-white">No Files Available</h2>
                    <p className="text-violet-200/80 mb-6 text-center max-w-md">
                        Get started with Cognify by uploading your course materials to access intelligent summaries and study tools.
                    </p>

                    <UploadFile courseId={courseId} />
                </div>
            </div>
        </div>
    )
}