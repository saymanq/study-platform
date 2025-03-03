'use client'

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    url: string;
    onPageChange: (page: number) => void;
}

export function PDFViewer({ url, onPageChange }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage);
        onPageChange(newPage);
    };

    const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3.0));  // 300%
    const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.1)); // 10%
    const resetZoom = () => setScale(1.0);

    return (
        <div className="flex flex-col h-full w-full">
            {/* Document viewer with improved scrolling and centering */}
            <div className="flex-grow overflow-auto w-full h-[calc(100%-70px)] flex justify-center bg-slate-950/30">
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex justify-center items-center h-64 w-full">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="text-violet-400">Loading document...</div>
                            </div>
                        </div>
                    }
                    error={
                        <div className="flex justify-center items-center h-64 w-full">
                            <div className="text-red-400">Failed to load PDF document</div>
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-xl"
                        scale={scale}
                        width={undefined}
                    />
                </Document>
            </div>

            {/* Controls with enhanced styling */}
            <div className="flex flex-wrap justify-between items-center p-3 bg-slate-800/70 border-t border-violet-500/20">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => pageNumber > 1 && handlePageChange(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="px-3 py-1.5 bg-violet-700 text-white rounded disabled:bg-violet-700/30 disabled:text-white/30 hover:bg-violet-600 transition-colors text-sm font-medium"
                        aria-label="Previous page"
                    >
                        ← Prev
                    </button>
                    <div className="text-sm text-violet-200 bg-slate-700/50 px-3 py-1.5 rounded border border-violet-500/20">
                        Page {pageNumber} of {numPages || '...'}
                    </div>
                    <button
                        onClick={() => pageNumber < (numPages || 0) && handlePageChange(pageNumber + 1)}
                        disabled={pageNumber >= (numPages || 0)}
                        className="px-3 py-1.5 bg-violet-700 text-white rounded disabled:bg-violet-700/30 disabled:text-white/30 hover:bg-violet-600 transition-colors text-sm font-medium"
                        aria-label="Next page"
                    >
                        Next →
                    </button>
                </div>

                <div className="flex gap-2 items-center mt-2 sm:mt-0">
                    <button
                        onClick={zoomOut}
                        className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
                        aria-label="Zoom out"
                    >
                        −
                    </button>
                    <button
                        onClick={resetZoom}
                        className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors text-xs"
                        aria-label="Reset zoom"
                    >
                        {Math.round(scale * 100)}%
                    </button>
                    <button
                        onClick={zoomIn}
                        className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}