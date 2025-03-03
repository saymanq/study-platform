
export function BrandLogo() {
    return (
        <div className="flex items-center">
            <div className="mr-2 relative w-8 h-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg"></div>
                <div className="absolute inset-[2px] bg-slate-900 rounded-md flex items-center justify-center">
                    <div className="text-violet-400 font-bold text-lg">S</div>
                </div>
            </div>
            <span className="text-white font-bold text-xl">StudySync</span>
            <span className="text-violet-400 ml-1">.</span>
        </div>
    );
}