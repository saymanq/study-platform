'use client'

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
//import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js';

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
//pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
//pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PDFViewerProps {
    url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center">
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                className="max-h-[80vh] overflow-auto"
            >
                <Page 
                    pageNumber={pageNumber} 
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                />
            </Document>
            <div className="flex gap-2 items-center mt-4">
                <button
                    onClick={() => setPageNumber(page => Math.max(1, page - 1))}
                    disabled={pageNumber <= 1}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <button
                    onClick={() => setPageNumber(page => Math.min(numPages ?? page, page + 1))}
                    disabled={pageNumber >= (numPages ?? 0)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}