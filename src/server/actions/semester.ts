'use server'

import { auth, clerkClient } from "@clerk/nextjs/server";  
import { revalidatePath } from "next/cache";

export async function updateSemester(semester: string) {
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    console.log("revalidated: ", semester);
    return { success: true };
}


export async function storeSemester(semester: string) {
    const { userId } = await auth();
    if (!userId) return;
    const client = await clerkClient()
    
    await client.users.updateUser(userId, {
        publicMetadata: { 
            currentSemester: semester
        },
    });
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    console.log("revalidated: ", semester);
}