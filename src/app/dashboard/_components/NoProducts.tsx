"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { coursesSchema } from "@/schemas/courses";
import { addCourse } from "@/server/actions/courses";
import { toast } from "@/hooks/use-toast";



export function NoProducts() {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof coursesSchema>>({
        resolver: zodResolver(coursesSchema),
        defaultValues: {
            c_abbrev: "",
            c_num: null,
        }
    })

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
                variant: data.error ? "destructive": "default"
            })
        }
    }
    
    return  (
        <div className="mt-32 text-center text-balance">
            <h1 className="text-4xl font-semibold mb-2">You have no courses</h1>
            <p className="mb-4">
                Get started with Cognify by adding a course
            </p>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="lg">Add Course</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                        <DialogDescription>
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
                                        <FormLabel htmlFor="c_abbrev" className="text-right">Course Name</FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <Input {...field} id="c_abbrev" placeholder="Example: CMPUT, MATH"/>
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
                                        <FormLabel htmlFor="c_num" className="text-right">Course Number</FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <Input 
                                                    type="number"
                                                    id="c_num"
                                                    value={value ?? ""}
                                                    onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                                                    placeholder="Example: 101, 102"
                                                />
                                            </FormControl>
                                            {error && <FormMessage>{error.message}</FormMessage>}
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button disabled={form.formState.isSubmitting}  type="submit">Save Course</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}