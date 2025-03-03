"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { coursesSchema } from "@/schemas/courses";
import { addCourse } from "@/server/actions/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { BookOpenIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";

interface CourseType {
    id: string;
    name: string;
    c_abbrev: string;
    c_num: number;
    description?: string;
    progress?: number;
    clerkUserID: string;
    createdAt: Date;
}

interface CoursesProps {
    courses: CourseType[];
}

export default function Courses({ courses }: CoursesProps) {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof coursesSchema>>({
        resolver: zodResolver(coursesSchema),
        defaultValues: {
            c_abbrev: "",
            c_num: null,
        }
    });

    async function onSubmit(values: z.infer<typeof coursesSchema>) {
        const transformedValues = {
            ...values,
            c_abbrev: values.c_abbrev.toUpperCase()
        };
        const data = await addCourse(transformedValues);
        setOpen(false);
        if (data?.message) {
            toast({
                title: data.error ? "Error" : "Success",
                description: data.message,
                variant: data.error ? "destructive" : "default"
            })
        }
    }

    return (
        <div className="bg-slate-900/80 rounded-xl border border-violet-500/30 
                shadow-lg shadow-violet-500/10 backdrop-blur-sm overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-violet-800 to-indigo-700">
                <h2 className="text-white font-medium text-center py-1">Your Courses</h2>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Card key={course.id}
                            className="transition-all hover:border-violet-400/40 hover:shadow-md 
                            bg-slate-800/50 border-violet-500/20 overflow-hidden">
                            <CardHeader className="pb-3 bg-gradient-to-br from-slate-800 to-slate-900">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg text-white">
                                        {course.c_abbrev} {course.c_num}
                                    </CardTitle>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600/20">
                                        <BookOpenIcon className="h-4 w-4 text-violet-300" />
                                    </div>
                                </div>
                                <CardDescription className="line-clamp-2 text-sm text-violet-200/70 mt-1">
                                    {course.name || "Course materials and resources"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm text-violet-200/80">
                                        <span>Progress</span>
                                        <span className="font-medium">{course.progress || 0}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                                            style={{ width: `${course.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2">
                                <Link href={`/courses/${course.id}`} className="w-full">
                                    <Button variant="outline"
                                        className="w-full justify-between border-violet-500/20 
                                        hover:border-violet-400/40 text-violet-100 hover:text-white
                                        bg-slate-800/50 hover:bg-slate-800 group">
                                        View Course
                                        <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}

                    {/* Add Course Card */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Card
                                className="transition-all hover:border-violet-400/40 hover:shadow-md 
                                bg-gradient-to-br from-violet-900/80 to-indigo-900/80 border-violet-500/30
                                h-full flex flex-col items-center justify-center cursor-pointer min-h-[225px]">
                                <div className="flex flex-col items-center gap-3 p-6 text-center">
                                    <div className="p-3 rounded-full bg-violet-500/20 border border-violet-400/30">
                                        <PlusIcon className="h-8 w-8 text-violet-200" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Add New Course</h3>
                                    <p className="text-violet-200/70 text-sm">
                                        Create a new course for this semester
                                    </p>
                                </div>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-violet-500/30">
                            <DialogHeader>
                                <DialogTitle className="text-white">Add New Course</DialogTitle>
                                <DialogDescription className="text-violet-200/70">
                                    Create a new course here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                    <FormField
                                        control={form.control}
                                        name="c_abbrev"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel htmlFor="c_abbrev" className="text-right text-violet-200">Course Name</FormLabel>
                                                <div className="col-span-3">
                                                    <FormControl>
                                                        <Input {...field} id="c_abbrev"
                                                            className="bg-slate-800 border-violet-500/30 text-white"
                                                            placeholder="Example: CMPUT, MATH" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <Controller
                                        control={form.control}
                                        name="c_num"
                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel htmlFor="c_num" className="text-right text-violet-200">Course Number</FormLabel>
                                                <div className="col-span-3">
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            id="c_num"
                                                            value={value ?? ""}
                                                            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                                                            placeholder="Example: 101, 102"
                                                            className="bg-slate-800 border-violet-500/30 text-white"
                                                        />
                                                    </FormControl>
                                                    {error && <FormMessage>{error.message}</FormMessage>}
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end">
                                        <Button disabled={form.formState.isSubmitting} type="submit"
                                            className="bg-gradient-to-r from-violet-700 to-indigo-600 
                                            hover:from-violet-600 hover:to-indigo-500 text-white">
                                            Save Course
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}