'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling

export function FileInfo({ fileData, currentPage }: {
    fileData: {
        fileSummary: Array<{ text: string | { response: string } }>;
        overallFileSummary: string;
    };
    currentPage: number;
}) {

    if (!fileData) {
        return <div>No explanation available</div>
    }

    const item = fileData.fileSummary[currentPage - 1];
    const textValue = typeof item?.text === "string" ? item?.text : item?.text?.response;
    const currentExplanation = textValue || "No explanation available";

    return (
        <div className="w-full text-violet-50">
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-violet-500/20">
                    <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-violet-700 data-[state=active]:text-white"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="details"
                        className="data-[state=active]:bg-violet-700 data-[state=active]:text-white"
                    >
                        Page Details
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                    <div className="bg-slate-800/30 p-4 rounded-lg border border-violet-500/10">
                        <h3 className="text-lg font-semibold mb-2 text-violet-300">Document Summary</h3>
                        <div className="prose prose-sm prose-invert prose-violet max-w-none">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {fileData.overallFileSummary || "No summary available"}
                            </ReactMarkdown>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                    <div className="bg-slate-800/30 p-4 rounded-lg border border-violet-500/10">
                        <h3 className="text-lg font-semibold mb-2 text-violet-300">Page {currentPage} Explanation</h3>
                        <div className="prose prose-sm prose-invert prose-violet max-w-none">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {currentExplanation}
                            </ReactMarkdown>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}