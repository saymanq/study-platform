import { getCourseSummary } from "@/server/actions/courseSummary";

export async function CourseSummary(props: {
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
            <h1>Course Summary</h1>
            {summaryData.map((item: { title: string; content: string }, index: number) => (
                <div key={index} className="mb-6">
                    <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                    <p className="text-gray-700">{item.content}</p>
                </div>
            ))}
        </div>
    )
}