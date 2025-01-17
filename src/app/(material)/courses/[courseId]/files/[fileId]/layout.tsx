
export default function CourseHomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" min-h-screen">
            <div className="max-w-full">
                {children}
            </div>
        </div>
    )

}