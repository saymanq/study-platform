'use client';
import { useSemesterStore } from "@/store/semesterStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { semesters } from "@/data/semesters";
import { getUserCreatedAt } from "@/server/actions/users";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateSemester } from "@/server/actions/semester";




export function Semester() {
    //const currentSemester = getCurrentSemester();
    const router = useRouter();
    const { currentSemester, setCurrentSemester } = useSemesterStore();
    // const [userCreatedAt, setUserCreatedAt] = useState<Date | null>(null);
    const userCreatedAt = new Date("2024-07-01");
    const [ mounted, setMounted ] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);

    // useEffect(() => {
    //     getUserCreatedAt().then(user => {
    //         if (user[0]) setUserCreatedAt(user[0].createdAt);
    //     });
    // }, []);

    const handleSemesterChange = async (value: string) => {
      setCurrentSemester(value);
      await updateSemester(value);
      router.refresh();
      router.push('/dashboard');
    };

    if (!mounted) return null;

    return (
        <div>
            <Select onValueChange={handleSemesterChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder={currentSemester} />
              </SelectTrigger>
              <SelectContent>
                {semesters.semesters
                  .filter(semester => {
                    const currentSemesterObj = semesters.semesters.find(s => s.name === currentSemester);
                    const now = new Date("2025-02-01");
                    return (userCreatedAt ? new Date(semester.endDate) >= userCreatedAt : true) 
                      && semester.name !== currentSemester 
                      && currentSemesterObj 
                      && new Date(semester.startDate) <= now;
                  })
                  .map((semester) => (
                    <SelectItem key={semester.name} value={semester.name}>
                      {semester.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

            {/* <span className="bg-violet-400 p-2 rounded-2xl text-white font-semibold">{currentSemester}</span> */}
        </div>
    )
}