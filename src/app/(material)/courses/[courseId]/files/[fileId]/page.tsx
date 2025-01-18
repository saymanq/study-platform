import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getFileUrl } from "@/server/actions/getFile";
import { getFileData } from "@/server/actions/getFileData";
import { FileViewWrapper } from "./_components/FileViewWrapper";


export default async function FileViewPage({
    params
}: {
    params: { courseId: string; fileId: string }
}) {
    const { userId, redirectToSignIn } = await auth();
    if (userId == null) return redirectToSignIn();

    const { courseId, fileId } = await params;
    if (fileId == null) return notFound();

    const fileUrl = await getFileUrl(fileId, userId);
    if (!fileUrl) return notFound();

    //const [currentPage, setCurrentPage] = useState(1);

    const client = await clerkClient()
    const user = await client.users.getUser(userId);
    const currentSemester = (user?.publicMetadata?.currentSemester as string) || "Unknown Semester";
    const formattedSemester = currentSemester.replace(/\s+/g, '');

    const fileData = await getFileData({ 
        courseId: courseId,
        userId: userId,
        semester: formattedSemester
    });

    return (
        // <div className="grid grid-cols-2 gap-8 w-full min-h-screen mx-auto">
            
        //     {/* PDF Viewer */}
        //     <div className="col-span-1 bg-card/100 rounded-2xl border-2 border-black  bg-violet-800">
        //         <PDFViewer url={fileUrl} onPageChange={() => {}} />
        //     </div>

        //     {/* Study Material */}
        //     <div className="col-span-1 bg-card/100 rounded-2xl py-4 px-3 border-2 border-black">
        //         <div className="flex flex-col items-center justify-center">
        //         <FileInfo fileData={fileData} currentPage={1} />
        //         </div>
        //     </div>
            
        // </div>
        <FileViewWrapper fileUrl={fileUrl} fileData={fileData} />
    )
}