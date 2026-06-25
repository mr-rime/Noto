'use client'

import { PageType } from "@/types"
import IconPicker from "./icon-picker"
import { useMutation } from "@tanstack/react-query"
import { updatePage } from "@/actions"
import { useCallback, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useIcon } from "@/hooks/use-icon"
import { usePagesList, updateNodeInTree } from "@/hooks/use-pages-list"

type NotoPageIconProps = {
    page: PageType
}

export default function NotoPageIcon({ page }: NotoPageIconProps) {
    const [open, setOpen] = useState(false)
    const { mutateAsync } = useMutation({ mutationFn: updatePage })
    const { user } = useUser()
    const emoji = useIcon()


    const onOpen = () => {
        setOpen(prev => !prev)
    }

    const handleUpdateIcon = useCallback(async (icon: string) => {
        emoji.setIcon(icon, page.id!)
        setOpen(false)
        const { pagesList, setPagesList } = usePagesList.getState()
        setPagesList(updateNodeInTree(pagesList, page.id!, { icon }))
        
        await mutateAsync({
            id: page.id!,
            icon,
            auth_id: user?.id
        })
    }, [mutateAsync, user?.id, page.id])

    return (
        (page.auth_id === user?.id) ? <>

            {
                !page.isArchived ? <IconPicker
                    asChild
                    onEmojiChange={handleUpdateIcon}
                    open={open}
                    onOpen={onOpen}
                >
                    <div className="absolute text-[5rem] -left-[165px] -top-[90px] select-none w-fit cursor-pointer">
                        {(emoji.pageId === page.id && emoji.icon) || page?.icon}
                    </div>
                </IconPicker> : <div className="absolute text-[5rem] -left-[165px] -top-[90px] select-none w-fit cursor-pointer">
                    {(emoji.pageId === page.id && emoji.icon) || page?.icon}
                </div>
            }
        </> : <div className="absolute text-[5rem] -left-[165px] -top-[90px] select-none w-fit cursor-pointer">
            {(emoji.pageId === page.id && emoji.icon) || page?.icon}
        </div>
    )
}