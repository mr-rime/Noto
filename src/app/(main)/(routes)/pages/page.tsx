import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { getRecentPages } from "@/lib/get-pages"
import { currentUser } from "@clerk/nextjs/server"
import { createPage } from "@/actions"
import Link from "next/link"
import Image from "next/image"
import { PageType } from "@/types"

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
}

function timeAgo(date: Date) {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

import { icons } from "@/constants/icons"

function PageCard({ page }: { page: PageType }) {
    const href = page.isArchived ? `/pages/${page.id}` : `/pages/${page.id}`
    return (
        <Link href={href} prefetch>
            <div className="group relative flex flex-col rounded-[8px] border border-[#EDEDEC] dark:border-[#2d2d2d] hover:border-[#D3D2D0] dark:hover:border-[#3a3a3a] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-150 overflow-hidden bg-white dark:bg-[#1F1F1F] cursor-pointer">
                <div className={`h-[80px] w-full flex-shrink-0 ${page.coverUrl ? "" : "bg-[#F7F7F5] dark:bg-[#2d2d2d]"}`}>
                    {page.coverUrl && (
                        <Image
                            src={page.coverUrl}
                            alt=""
                            width={400}
                            height={80}
                            className="w-full h-full object-cover object-center"
                            unoptimized
                        />
                    )}
                </div>

                <div className="px-[14px] pt-[10px] pb-[12px] flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[16px] leading-none shrink-0">
                            {page.icon || icons.pageEmpty}
                        </span>
                        <span className="text-[14px] font-semibold text-[#37352F] dark:text-[#e8e8e7] truncate">
                            {page.title || "Untitled"}
                        </span>
                        {page.isArchived && (
                            <span className="shrink-0 text-[10px] font-medium text-[#EB5757] bg-[#fbe4e4] px-1.5 py-0.5 rounded-[4px]">
                                Deleted
                            </span>
                        )}
                    </div>
                    <span className="text-[12px] text-[#9B9A97] dark:text-[#6b6b68]">
                        Edited {timeAgo(page.updated_at!)}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default async function HomePage() {
    const user = await currentUser()

    const [newUser] = await db.insert(usersTable).values({
        auth_id: user?.id!,
        email: user?.primaryEmailAddress?.emailAddress || "",
        name: user?.fullName || `${user?.firstName || "User-"}${user?.lastName || user?.id}`,
        avatar_url: user?.hasImage ? user?.imageUrl : ""
    }).onConflictDoNothing().returning()

    if (newUser) {
        await createPage({
            id: crypto.randomUUID(),
            title: "Welcome to Noto!",
            icon: "👋",
            coverUrl: "https://images.unsplash.com/photo-1506744626753-14d6433e5c9d?q=80&w=2000&auto=format&fit=crop",
            auth_id: user?.id!
        })
    }

    const recentPages = await getRecentPages(user?.id!)
    const firstName = user?.firstName || "there"

    return (
        <div className="w-full ml-[var(--sidebar-width,300px)] min-h-screen bg-white dark:bg-[#1F1F1F]">
            <div className="max-w-[860px] mx-auto px-10 pt-20 pb-16">

                <div className="mb-10">
                    <h1 className="text-[32px] font-bold text-[#37352F] dark:text-[#e8e8e7] leading-tight">
                        {getGreeting()}, {firstName} 👋
                    </h1>
                    <p className="text-[15px] text-[#9B9A97] dark:text-[#6b6b68] mt-1">
                        Here's what you've been working on.
                    </p>
                </div>

                {recentPages.length > 0 ? (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[12px] font-semibold text-[#9B9A97] dark:text-[#6b6b68] uppercase tracking-wider">
                                Recently updated
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {recentPages.map((page) => (
                                <PageCard key={page.id} page={page as PageType} />
                            ))}
                        </div>
                    </section>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-[48px] mb-4 select-none">📄</div>
                        <p className="text-[16px] font-medium text-[#37352F] dark:text-[#e8e8e7]">No pages yet</p>
                        <p className="text-[14px] text-[#9B9A97] dark:text-[#6b6b68] mt-1">
                            Create your first page from the sidebar to get started.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}