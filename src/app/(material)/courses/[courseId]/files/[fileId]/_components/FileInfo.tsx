'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

    //const currentExplanation = fileData.fileSummary[currentPage - 1]?.text.response || "No explanation available for this page";
    // In FileInfo.tsx
    const item = fileData.fileSummary[currentPage - 1];
    const textValue = typeof item?.text === "string" ? item?.text : item?.text?.response;
    const currentExplanation = textValue || "No explanation available";
    
    return (
        <div>
            <Tabs defaultValue="overview" className="w-full text-white">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">File Overview</h2>
                        <p className="text-muted-foreground">{fileData.overallFileSummary}</p>
                    </div>
                </TabsContent>
                <TabsContent value="explanation">
                    <div className="mt-4">
                        <h2 className="text-sm mb-1 font-light">Page {currentPage}</h2>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children, node }) => {
                                // Check if parent is already a p tag
                                if (node?.parent?.tagName === 'p') {
                                    return <>{children}</>;
                                }
                                return <p className="mb-4">{children}</p>;
                                },
                                // Style headers
                                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
                                
                                // Style code blocks
                                code: ({ inline, className, children }) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return inline ? (
                                        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono">
                                            {children}
                                        </code>
                                    ) : (
                                        <span className="bg-gray-100 dark:bg-gray-800 rounded-lg px-2 inline-block w-fit max-w-full align-middle">
                                            <pre className="overflow-x-auto">
                                                <code className={`language-${match?.[1] ?? ''} text-sm`}>
                                                    {children}
                                                </code>
                                            </pre>
                                        </span>
                                    );
                                },
                                
                                // Style lists
                                ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                                
                                // Style links
                                a: ({ href, children }) => (
                                <a href={href} className="text-blue-600 hover:underline">
                                    {children}
                                </a>
                                ),
                            }}>
                                {currentExplanation}
                        </ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}