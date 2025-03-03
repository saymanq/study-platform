import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCourseSummary } from "@/server/actions/courseSummary";

export async function CourseInfo(props: {
    courseId: string;
    userId: string;
    semester: string;
}) {
    
    const summaryData = await getCourseSummary({ 
        courseId: props.courseId,
        userId: props.userId,
        semester: props.semester
    });

    if (!summaryData) {
        return <div className="text-violet-300/80 text-center p-8">No summary available for this course yet</div>
    }
    
    return (
        <div className="text-violet-50">
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/60 rounded-lg p-1">
                    <TabsTrigger 
                        value="overview" 
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-700 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-violet-700/20"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger 
                        value="summary" 
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-700 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-violet-700/20"
                    >
                        Summary
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                    <div className="mt-6 bg-slate-800/30 p-5 rounded-lg border border-violet-500/20 shadow-sm shadow-violet-500/5">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-200">Course Overview</h2>
                        <p className="text-violet-100/90 mt-3 leading-relaxed">{summaryData.overallSummary}</p>
                    </div>
                </TabsContent>
                
                <TabsContent value="summary">
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-200">Course Summary</h2>
                        <div className="space-y-6">
                            {summaryData.summary?.map((item: { title: string; content: string }, index: number) => (
                                <div key={index} className="bg-slate-800/30 p-5 rounded-lg border border-violet-500/20 shadow-sm shadow-violet-500/5">
                                    <h3 className="text-xl font-bold mb-3 text-violet-200">{item.title}</h3>
                                    <p className="text-violet-100/80 leading-relaxed">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}