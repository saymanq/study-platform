'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { semesters } from "@/data/semesters";
import { getUserCreatedAt } from "@/server/actions/users";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storeSemester } from "@/server/actions/semester";




export function Semester({ initialSemester }: { initialSemester: string }) {
    const router = useRouter();
    const [userCreatedAt, setUserCreatedAt] = useState<Date | null>(null);
    const [ mounted, setMounted ] = useState(false);
    const [value, setValue] = useState(initialSemester);
    
    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
        getUserCreatedAt().then(user => {
            if (user[0]) setUserCreatedAt(user[0].createdAt);
        });
    }, []);

    const handleSemesterChange = async (value: string) => {
      setValue(value);
      await storeSemester(value);
      router.refresh();
    };

    if (!mounted) return null;

    return (
        <div>
            <Select onValueChange={handleSemesterChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder={value} >{value}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {semesters.semesters
                  .filter(semester => {
                    const currentSemesterObj = semesters.semesters.find(s => s.name === initialSemester);
                    const now = new Date();
                    return (userCreatedAt ? new Date(semester.endDate) >= userCreatedAt : true) 
                      && semester.name !== initialSemester 
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