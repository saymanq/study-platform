'use client'

import { useState } from 'react';
import { PDFViewer } from "./PDFViewer";
import { FileInfo } from "./FileInfo";

interface FileData {
    fileSummary: Array<{ text: { response: string } }>;
    overallFileSummary: string;
}

export function FileViewWrapper({ 
    fileUrl, 
    fileData 
}: { 
    fileUrl: string;
    fileData: FileData;
}) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="grid grid-cols-2 gap-8 w-full min-h-screen mx-auto">
            <div className="col-span-1 bg-card/100 rounded-2xl border-2 border-black bg-violet-800">
                <PDFViewer url={fileUrl} onPageChange={setCurrentPage} />
            </div>

            <div className="col-span-1 bg-card/100 rounded-2xl py-4 px-3 border-2 border-black">
                <div className="flex flex-col items-center justify-center">
                    <FileInfo fileData={fileData} currentPage={currentPage} />
                </div>
            </div>
        </div>
    );
}