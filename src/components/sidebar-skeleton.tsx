import { Skeleton } from "@/components/ui/skeleton"

export function SidebarSkeleton() {
    return (
        <aside className="bg-[#F8F8F7] w-[var(--sidebar-width,300px)] min-h-screen shadow-sidebar p-1 z-20 fixed top-0">
            <div className="space-y-4 p-3">
                <Skeleton className="w-12 h-12 rounded-full" />

                <div className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-20 h-4" />
                </div>

                <Skeleton className="w-full h-8 rounded-md" />
            </div>

            <div className="px-3">
                <div className="my-5">
                    <Skeleton className="w-full h-px" />
                </div>
            </div>

            <div className="space-y-2 px-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-4 rounded" />
                ))}
            </div>

            <div className="px-3 mt-6">
                <div className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-16 h-4" />
                </div>
            </div>
        </aside>
    )
}
