'use client'

import Image from "next/image"
import { icons } from "@/constants/icons"
import SidebarItem from "./sidebar-item"
import NotoTooltip from "./noto-tooltip"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { createPage } from "@/actions"
import { useCallback } from "react"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { usePagesList } from "@/hooks/use-pages-list"
import { PageType } from "@/types"
import UserProfileMenu from "./user-profile-menu"

const MAX_PAGES = 4

export default function UserAvatar() {
    const router = useRouter()
    const { user } = useUser()
    const { pageId }: { pageId: string[] } = useParams()
    const pagesList = usePagesList()

    const { mutateAsync } = useMutation({
        mutationFn: createPage,
        onMutate: async (newPage) => {
            const tempId = `temp-${Date.now()}`

            const optimisticPage: PageType = {
                id: tempId,
                title: newPage.title,
                auth_id: newPage.auth_id,
                isArchived: false,
                content: [],
                type: 'empty',
                icon: undefined,
                coverUrl: undefined,
                isPublished: false,
                created_at: new Date(),
                updated_at: new Date(),
                children: [],
            }
        const previousPages = usePagesList.getState().pagesList

            usePagesList.getState().setPagesList([...previousPages, optimisticPage])

            return { previousPages, tempId }
        },
        onSuccess: (data, _variables, context) => {
            const current = usePagesList.getState().pagesList
            usePagesList.getState().setPagesList([
                ...current.filter((p) => p.id !== context?.tempId),
                { children: [], ...(data as any) },
            ])

            router.push(`/pages/${data.id}`)
            toast.success("Page has been created")
        },
        onError: (_err, _variables, context) => {
            if (context?.previousPages) {
                usePagesList.getState().setPagesList(context.previousPages)
            }
            toast.error("Failed to create page")
        },
    })

    const isAtLimit = pagesList.pagesList.length >= MAX_PAGES

    const handleMutate = useCallback(async () => {
        if (usePagesList.getState().pagesList.length >= MAX_PAGES) {
            toast.error(`You can only have ${MAX_PAGES} pages at the top level`)
            return
        }
        await mutateAsync({
            title: 'New Page',
            auth_id: user?.id!,
            currentPageId: pageId?.[0],
        })
    }, [user, mutateAsync, pageId])

    return (
        <SidebarItem className="my-[8px] " >
            <UserProfileMenu>
                <div className="flex items-center space-x-2 min-w-0 flex-1 overflow-hidden cursor-pointer" title="Account settings">
                    <Image src={user?.imageUrl || ""} alt="avatar" width={20} height={20} className="rounded-[5px] flex-shrink-0" />
                    <span className="font-semibold text-[#37352F] dark:text-[#e8e8e7] text-[14px] truncate">
                        {user?.fullName || user?.firstName}
                    </span>
                </div>
            </UserProfileMenu>
            <NotoTooltip content={isAtLimit ? `Page limit reached (max ${MAX_PAGES})` : "Create a new page"}>
                <div
                    onClick={() => handleMutate()}
                    className={`h-[28px] w-[28px] rounded-[6px] flex items-center justify-center transition-colors text-[#37352F] dark:text-white ${
                        isAtLimit
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-[#E8E8E8] dark:hover:bg-[#2d2d2d] cursor-pointer"
                    }`}
                >
                    <span>{icons.compose}</span>
                </div>
            </NotoTooltip>
        </SidebarItem>
    )
}
