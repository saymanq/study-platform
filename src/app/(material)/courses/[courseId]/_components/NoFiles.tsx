import { UploadFile } from "./UploadFile";


export function NoFiles() {
    
    return (
        <div className="mt-32 text-center text-balance">
            <h1 className="text-4xl font-semibold mb-2">You have no files for this course</h1>
            <p className="mb-4">
                Get started with Cognify by adding a file
            </p>
            <UploadFile />
        </div>
    )
}