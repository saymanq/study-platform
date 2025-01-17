import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { PDFViewer } from "./_components/PDFViewer";
import { getFileUrl } from "@/server/actions/getFile";

export default async function FileViewPage({
    params
    } : {
        params: { courseId: string; fileId: string }
    }
) {
    const { userId, redirectToSignIn } = await auth();
    if (userId == null) return redirectToSignIn();

    const { fileId } = params;
    if (fileId == null) return notFound();

    const fileUrl = await getFileUrl(fileId, userId);
    if (!fileUrl) return notFound();

    return (
        <div className="grid grid-cols-2 gap-8 w-full min-h-screen mx-auto">
            
            {/* PDF Viewer */}
            <div className="col-span-1 bg-card/100 rounded-2xl py-4 px-3 border-2 border-black">
                <PDFViewer url={fileUrl} />
            </div>

            {/* Study Material */}
            <div className="col-span-1 bg-card/100 rounded-2xl py-4 px-3 border-2 border-black">
                <div className="flex flex-col items-center justify-center">
                    
                </div>
            </div>
            
        </div>
    )
}