'use client'

import { useState } from 'react';
import { PDFViewer } from "./PDFViewer";
import { FileInfo } from "./FileInfo";

interface FileData {
    fileSummary: Array<{ text: string | { response: string } }>;
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
    const [fullscreenPDF, setFullscreenPDF] = useState(false);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-violet-950 to-slate-900 p-4 md:p-6">
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-[calc(100vh-3rem)]">
                {/* PDF Viewer Panel */}
                <div className={`
                    bg-slate-900/80 rounded-xl border border-violet-500/30 
                    shadow-lg shadow-violet-500/10 backdrop-blur-sm overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${fullscreenPDF ? 'lg:col-span-2 h-[85vh]' : 'h-[80vh] lg:h-auto'}
                `}>
                    <div className="p-1 bg-gradient-to-r from-violet-800 to-indigo-700 flex justify-between items-center">
                        <h3 className="text-white font-medium text-center text-sm ml-2">Document Viewer</h3>
                        <button
                            onClick={() => setFullscreenPDF(prev => !prev)}
                            className="text-white/80 hover:text-white text-xs px-2 py-0.5 bg-slate-800/50 rounded mr-1"
                        >
                            {fullscreenPDF ? 'Exit Fullscreen' : 'Fullscreen'}
                        </button>
                    </div>
                    <div className="h-[calc(100%-28px)]">
                        <PDFViewer url={fileUrl} onPageChange={setCurrentPage} />
                    </div>
                </div>

                {/* File Info Panel */}
                <div className={`
                    bg-slate-900/80 rounded-xl border border-violet-500/30 
                    shadow-lg shadow-violet-500/10 backdrop-blur-sm
                    transition-all duration-300 ease-in-out
                    ${fullscreenPDF ? 'hidden lg:block' : ''}
                `}>
                    <div className="p-1 bg-gradient-to-r from-violet-800 to-indigo-700">
                        <h3 className="text-white font-medium text-center text-sm">Document Information</h3>
                    </div>
                    <div className="p-4 max-h-[80vh] lg:max-h-[calc(100vh-8rem)] overflow-y-auto">
                        <FileInfo fileData={fileData} currentPage={currentPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}