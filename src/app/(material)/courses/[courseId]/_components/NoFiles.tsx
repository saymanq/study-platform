"use client"

import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"

export function NoFiles() {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        handleFiles(files)
    }, [])

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : []
        handleFiles(files)
    }

    const handleFiles = (files: File[]) => {
        // Handle your file upload logic here
        console.log('Files to upload:', files)
    }

    return (
        <div className="mt-32 text-center text-balance">
            <h1 className="text-4xl font-semibold mb-2">You have no files for this course</h1>
            <p className="mb-4">
                Get started with Cognify by adding a file
            </p>
            <div className="flex justify-center">
                <div
                    className={`w-full max-w-md p-8 border-2 border-dashed rounded-lg 
                    ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-800'}
                    transition-colors duration-200`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center gap-4">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <div className="flex flex-col items-center gap-2">
                            <Button variant="outline" asChild>
                                <label>
                                    <span>Choose file</span>
                                    <input
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileInput}
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                            </Button>
                            <p className="text-sm text-gray-500">
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                                PDF, DOC, DOCX (MAX. 10MB)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}