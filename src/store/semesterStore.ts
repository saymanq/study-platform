import { semesters } from '@/data/semesters';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SemesterState {
  currentSemester: string;
  setCurrentSemester: (semester: string) => void;
}

function getCurrentSemester(): string {
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

export const useSemesterStore = create<SemesterState>()(
  persist(
    (set) => ({
      // currentSemester: getCurrentSemester(), // Default value
      currentSemester: "Winter 2025",
      setCurrentSemester: (semester) => {
        set({ currentSemester: semester });
        console.log("Store Updated: ", semester);
      },
    }),
    {
      name: 'semester-storage',
    }
  )
);