import { semesters } from "@/data/semesters";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentSemester(): string {
  const now = new Date();
  
  for (const semester of semesters.semesters) {
    const startDate = new Date(semester.startDate);
    const endDate = new Date(semester.endDate);
    
    if (now >= startDate && now <= endDate) {
      return semester.name;
    }
  }

  // If not found in predefined semesters, return a default value
  return "Unknown Semester";
}