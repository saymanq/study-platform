'use client'

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
//import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js';

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;
//pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
//pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
//   ).toString();


interface PDFViewerProps {
    url: string;
    onPageChange: (page: number) => void;
}

export function PDFViewer({ url, onPageChange }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage);
        onPageChange(newPage);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="max-h-[84vh] overflow-auto w-full flex justify-center mt-3">
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page 
                        pageNumber={pageNumber} 
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="max-w-full"
                    />
                </Document>
            </div>
            <div className="flex gap-2 items-center mt-4 p-3 bg-green-400">
                <button
                    onClick={() => handlePageChange(Math.max(1, pageNumber - 1))}
                    disabled={pageNumber <= 1}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <button
                    onClick={() => handlePageChange(Math.min(numPages ?? pageNumber, pageNumber + 1))}
                    disabled={pageNumber >= (numPages ?? 0)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}