'use client'

import { useCallback, useState } from "react"
import { Input } from "./ui/input"
import { useKey } from "@/hooks/use-key"
import { useIsSaving } from "@/hooks/use-is-saving"
import { PageType } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { updatePage } from "@/actions"
import { useDocuments } from "@/hooks/use-documents"
import { useUser } from "@clerk/nextjs"
import PublishMenu from "./publish-menu"
import { useIcon } from "@/hooks/use-icon"

export default function NotoPageHeader({ page }: { page: PageType }) {
    const [isEditable, setIsEditable] = useState(false)
    const [title, setTitle] = useState(page.title)
    const isSaving = useIsSaving(state => state.isSaving)
    const { mutateAsync } = useMutation({
        mutationFn: updatePage
    })

    const { user } = useUser()
    const emoji = useIcon()

    const document = useDocuments()
    const newTitle = page.id === document.id ? document.title : page.title

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        document.setTitle(e.target.value, page.id!)
    }, [document, page.id])


    const handleUpdatePage = useCallback(async () => {
        await mutateAsync({
            id: page.id!,
            title,
            auth_id: user?.id!
        })
        document.setTitle(title!, page.id!)
        setIsEditable(false)
    }, [mutateAsync, page.id, title, document, user?.id])

    useKey({ keys: "Enter", handler: handleUpdatePage });

    return (
        <div className="h-[44px] pl-[12px] pr-[10px] flex items-center justify-between overflow-hidden sticky left-0 top-0 z-50 bg-white ">
            {
                !page.isArchived && page.auth_id === user?.id ? <>
                    {
                        isEditable ?
                            <Input onBlur={() => setIsEditable(false)} onChange={handleChange} autoFocus defaultValue={page.title || "New Page"} className="w-[100px] h-[25px] rounded-[6px]" placeholder="New Page" />
                            :
                            <div onClick={() => setIsEditable(true)} className="hover:bg-[#F0F0EF] transition-colors cursor-pointer rounded-[6px] w-fit max-w-[150px] truncate py-[2px] px-3 space-x-1 text-[15px]">
                                <span>
                                    {(emoji.pageId === page.id && emoji.icon) || page.icon}
                                </span>
                                <span>
                                    {newTitle || "New Page"}
                                </span>
                            </div>
                    }
                </> : <div className="hover:bg-[#F0F0EF] transition-colors cursor-pointer rounded-[6px] w-fit max-w-[150px] truncate py-[2px] px-3 space-x-1 text-[15px]">
                    <span>
                        {(emoji.pageId === page.id && emoji.icon) || page.icon}
                    </span>
                    <span>
                        {newTitle || "New Page"}
                    </span>
                </div>
            }

            <div className="flex items-center px-5">
                <div className="text-[#9E9A97] px-3">
                    {
                        isSaving ? "Editing..." : "Edited"
                    }
                </div>
                {
                    page.auth_id === user?.id && !page.isArchived && <PublishMenu page={page}>
                        <div className="hover:bg-[#F0F0EF] transition-colors cursor-pointer rounded-[6px] w-fit max-w-[150px] truncate py-[2px] px-3 space-x-1 text-[15px]">
                            Share
                        </div>
                    </PublishMenu>
                }
            </div>
        </div>
    )
}