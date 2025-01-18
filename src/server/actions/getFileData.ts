import { getFData } from "../db/coursefiles";


export async function getFileData(props: { 
    courseId: string;
    userId: string;
    semester: string;
}) {
    
    const fileData = await getFData(props.courseId, props.userId, props.semester);
    return {
        fileSummary: fileData?.[0]?.fileSummary,
        overallFileSummary: fileData?.[0]?.overallFileSummary
    };
}