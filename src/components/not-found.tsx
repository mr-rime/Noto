import { icons } from "@/constants/icons";

export default function NotFound() {
    return (
        <div className="w-full min-h-screen ml-[var(--sidebar-width,300px)] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div>
                    {icons.eyes}
                </div>
                <div className="font-medium text-[17px]">
                    This content does not exist
                </div>
            </div>
        </div>
    )
}
