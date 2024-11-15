import { Brain } from "lucide-react";

export function BrandLogo() {
    return (
        <span className="flex items-center gap-2 font-semibold flex-shrink-0 text-lg">
            <Brain className="size-8" />
            <span>Cognify</span>
        </span>
    )
}