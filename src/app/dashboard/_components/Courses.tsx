"use client"
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function Courses() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
      </div>

      <Card 
        className="p-4 flex items-center justify-center h-[100px] cursor-pointer hover:opacity-75 transition"
        onClick={() => {/* Add your navigation or modal trigger here */}}
      >
        <div className="flex flex-col items-center gap-2">
          <Plus className="h-7 w-10" />
          <p className="font-semibold">Add a course</p>
        </div>
      </Card>
    </div>
  )
}