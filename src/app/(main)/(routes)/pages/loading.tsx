import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
    return (
        <div className="w-full ml-[var(--sidebar-width,300px)] min-h-screen bg-white dark:bg-[#1F1F1F]">
            <div className="max-w-[860px] mx-auto px-10 pt-20 pb-16">
                {/* Greeting Skeleton */}
                <div className="mb-10">
                    <Skeleton className="h-10 w-64 mb-3 bg-[#E5E5E5] dark:bg-[#2d2d2d]" />
                    <Skeleton className="h-5 w-48 bg-[#E5E5E5] dark:bg-[#2d2d2d]" />
                </div>

                {/* Recent pages Grid Skeleton */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-4 w-32 bg-[#E5E5E5] dark:bg-[#2d2d2d]" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col rounded-[8px] border border-[#EDEDEC] dark:border-[#2d2d2d] overflow-hidden bg-white dark:bg-[#1f1f1f]">
                                <Skeleton className="h-[80px] w-full rounded-none bg-[#F7F7F5] dark:bg-[#2d2d2d]" />
                                <div className="px-[14px] pt-[10px] pb-[12px] flex flex-col gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <Skeleton className="h-4 w-4 rounded-full bg-[#E5E5E5] dark:bg-[#3a3a3a]" />
                                        <Skeleton className="h-4 w-24 bg-[#E5E5E5] dark:bg-[#3a3a3a]" />
                                    </div>
                                    <Skeleton className="h-3 w-16 bg-[#E5E5E5] dark:bg-[#3a3a3a]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
