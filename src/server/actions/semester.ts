'use server'

import { revalidatePath } from "next/cache";

export async function updateSemester(semester: string) {
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'page');
    console.log("revalidated: ", semester);
    return { success: true };
}