import { getCSummary } from "../db/courseSummary";

export async function getCourseSummary(props: { 
    courseId: string;
    userId: string;
    semester: string;
}) {
    
    const summary = await getCSummary(props.courseId, props.userId, props.semester);
    return {
        summary: summary?.[0]?.summary,
        overallSummary: summary?.[0]?.overallSummary
    };
}