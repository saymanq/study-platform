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
        return <div>No summary available</div>
    }
    
    return (
        <div>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">Course Overview</h2>
                        <p className="text-muted-foreground">{summaryData.overallSummary}</p>
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-6">Course Summary</h2>
                        {summaryData.summary?.map((item: { title: string; content: string }, index: number) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-700">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}