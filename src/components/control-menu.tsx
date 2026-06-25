'use client'

import { updatePage, duplicatePage } from "@/actions"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { icons } from "@/constants/icons"
import { useMutation } from "@tanstack/react-query"
import { useUser } from "@clerk/nextjs"
import { useOrigin } from "@/hooks/use-origin"
import { useMoveTo } from "@/hooks/use-move-to"
import { usePagesList, removeNodeFromTree } from "@/hooks/use-pages-list"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ControlMenuProps {
    pageId: string
    children: React.ReactNode
    onOpen?: () => void
    open?: boolean
}

export default function ControlMenu({ children, onOpen, open, pageId }: ControlMenuProps) {
    const { mutateAsync } = useMutation({
        mutationFn: updatePage,
        onMutate: async ({ id, isArchived }) => {
            if (isArchived) {
                const previous = usePagesList.getState().pagesList
                usePagesList.getState().setPagesList(removeNodeFromTree(previous, id))
                return { previous }
            }
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                usePagesList.getState().setPagesList(context.previous)
            }
            toast.error("Failed to archive page")
        }
    })
    const { user } = useUser()
    const origin = useOrigin()
    const router = useRouter()
    const { mutateAsync: duplicateAsync } = useMutation({
        mutationFn: duplicatePage
    })
    const moveTo = useMoveTo()

    const handleArchive = async () => {
        try {
            await mutateAsync({
                id: pageId,
                auth_id: user?.id!,
                isArchived: true,
            })
            router.push(`/pages/${pageId}`)
        } finally {
            onOpen?.()
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${origin}/pages/public/${pageId}`)
        toast.success("Copied block link to clipboard")
        onOpen?.()
    }

    const handleDuplicate = async () => {
        const promise = duplicateAsync({ id: pageId, auth_id: user?.id! })
        toast.promise(promise, {
            loading: 'Duplicating page...',
            success: 'Page duplicated',
            error: 'Failed to duplicate page',
        })
        onOpen?.()
    }

    const handleMoveTo = () => {
        moveTo.onOpen(pageId)
        onOpen?.()
    }

    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-[265px] min-w-[180px] max-w-[calc(-24px + 100vw)] shadow-none translate-x-2 relative !z-20 p-1 rounded-[6px] ">
                <div onClick={handleCopyLink} className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px]">
                    {icons.link} <span>Copy link</span>
                </div>
                <div onClick={handleDuplicate} className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px]">
                    {icons.duplicate} <span>Duplicate</span>
                </div>
                <div onClick={handleMoveTo} className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px]">
                    {icons.arrowTurnUpRight} <span>Move to</span>
                </div>
                <div onClick={handleArchive} className="hover:bg-[#F3F3F3] transition-colors cursor-pointer rounded-[6px] h-[28px] flex items-center space-x-3 text-[14px] px-[8px] hover:text-[#EB5757] ">
                    {icons.trash} <span>Move to trash</span>
                </div>
            </PopoverContent>
        </Popover>
    )
}
