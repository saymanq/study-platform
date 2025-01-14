"use client"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { toast } from "@/hooks/use-toast"
import { dataProcessing } from "@/server/actions/dataProcessing"
import { useRouter } from "next/navigation"


type UploadFileProps = {
    courseId: string
}

export function UploadFile({ courseId }: UploadFileProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleFiles = useCallback(async (files: File[]) => {
        if (files.length === 0) return

        const file = files[0] // Handle first file for now
        if (file.size > 1024 * 1024 * 10) { // 10MB limit
            toast({
                title: "File too large",
                description: "Please upload files smaller than 10MB",
                variant: "destructive"
            })
            return
        }

        try {
            setIsUploading(true)
            await dataProcessing(file, courseId)
            toast({
                title: "Success",
                description: "File uploaded successfully"
            })
            router.refresh();
        } catch (error) {
            console.error("Upload error:", error)
            toast({
                title: "Upload failed",
                description: "There was a problem uploading your file",
                variant: "destructive"
            })
        } finally {
            setIsUploading(false)
        }
    }, [courseId, router])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        handleFiles(files)
    }, [handleFiles])

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : []
        handleFiles(files)
    }, [handleFiles])

    
    return (
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
                                <span>{isUploading ? "Uploading..." : "Choose file"}</span>
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
    )
}