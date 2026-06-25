'use client'

import { PageType } from "@/types"
import { Input } from "./ui/input"
import { icons } from "@/constants/icons"
import NotoTooltip from "./noto-tooltip"
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { deletePage, updatePage } from "@/actions"
import { cn } from "@/lib/cn"
import { useUser } from "@clerk/nextjs"
import { usePagesList, addOptimisticChildToTree } from "@/hooks/use-pages-list"
import { Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface TrashContentProps {
    trash: PageType[]
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function TrashContent({ trash, setOpen }: TrashContentProps) {
    const [search, setSearch] = useState("")

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const trashContent = useMemo(() => {
        return trash.filter(page => page.title?.toLowerCase().includes(search.toLowerCase())).map((page) => (<TrashItem key={page.id} page={page} setOpen={setOpen} />))
    }, [search, trash, setOpen])

    return (
        <>
            <div className="py-[4px] px-[8px] mt-[10px]">
                <Input onChange={handleSearch} className="h-[28px] !ring-[#B2D4F5] rounded-[6px]" placeholder="Search pages in trash" />
            </div>
            <div className={cn("min-h-[200px] w-full mt-4 px-[8px]", trash.length === 0 && "flex items-center justify-center")}>
                {
                    trash.length === 0 ? (
                        <div className="w-full flex flex-col items-center  justify-center h-fit max-h-[250px] mx-auto">
                            <span className="text-[#CECBC8] ">
                                {icons.trash}
                            </span>
                            <span className="text-[#5E5C57] text-[14px]">
                                Trashed pages appear here
                            </span>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col h-fit max-h-[250px] overflow-x-auto">
                            {trashContent}
                        </div>
                    )
                }
            </div>
        </>
    )
}


function TrashItem({ page, setOpen }: {
    page: PageType, setOpen: Dispatch<SetStateAction<boolean>>
}) {
    const router = useRouter()
    const { mutateAsync: updatePageMutation } = useMutation({
        mutationFn: updatePage
    })

    const { mutateAsync: deletePageMutation } = useMutation({
        mutationFn: deletePage
    })
    const { user } = useUser()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleNavigate = () => {
        router.push(`/pages/${page.id}`)
        setOpen(false)
    }

    const handleRestore = async (e: React.MouseEvent) => {
        e.stopPropagation()
        
        const previous = usePagesList.getState().pagesList
        if (page.parent_id) {
             usePagesList.getState().setPagesList(addOptimisticChildToTree(previous, page.parent_id, page))
        } else {
             usePagesList.getState().setPagesList([...previous, page])
        }

        try {
            await updatePageMutation({ id: page.id!, isArchived: false, auth_id: user?.id! })
        } catch {
             usePagesList.getState().setPagesList(previous)
        } finally {
            router.push(`/pages/${page.id}`)
            setOpen(false)
        }
    }

    const promptDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsConfirmOpen(true)
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDeleting(true)
        try {
            await deletePageMutation({ id: page.id! })
        } finally {
            router.push(`/pages`)
            setOpen(false)
            setIsConfirmOpen(false)
            setIsDeleting(false)
        }
    }

    return (
        <>
            <div onClick={handleNavigate} className="flex items-center justify-between w-full h-[40px] p-2 hover:bg-[#F3F3F3] cursor-pointer rounded-[6px] select-none">
                <div className="flex items-center space-x-2">
                    <div>
                        {page.icon ? <div>{page.icon}</div> : icons.pageEmpty}
                    </div>
                    <div className="text-[14px] text-[#37352F] w-[100px] truncate">
                        {page.title || "Untitled"}
                    </div>
                </div>

                <div className="flex items-center space-x-[2px]">
                    <NotoTooltip content="Restore">
                        <div onClick={handleRestore} className="hover:bg-[#E8E8E8] text-[#9F9E9B] p-[4px] rounded-[6px] transition-colors">
                            {icons.undo}
                        </div>
                    </NotoTooltip>
                    <NotoTooltip content="Delete from trash">
                        <div onClick={promptDelete} className="hover:bg-[#E8E8E8] text-[#9F9E9B] p-[4px] rounded-[6px] transition-colors">
                            {icons.trash}
                        </div>
                    </NotoTooltip>
                </div>
            </div>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete <b>{page.title || "Untitled"}</b> and all of its nested pages. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <button disabled={isDeleting} onClick={(e) => { e.stopPropagation(); setIsConfirmOpen(false) }} className="px-4 py-2 text-sm font-medium text-[#37352F] hover:bg-[#F3F3F3] rounded-[6px] transition-colors border border-[#EDEDEC] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            Cancel
                        </button>
                        <button disabled={isDeleting} onClick={handleDelete} className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-[#EB5757] hover:bg-[#D94E4E] rounded-[6px] transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>Delete permanently</span>
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}