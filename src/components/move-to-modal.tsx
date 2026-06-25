'use client'

import { useMoveTo } from "@/hooks/use-move-to"
import { usePagesList } from "@/hooks/use-pages-list"
import { moveToPage } from "@/actions"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { PageType } from "@/types"
import { icons } from "@/constants/icons"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

function flattenPages(pages: PageType[], excludeId: string, result: PageType[] = []): PageType[] {
    for (const page of pages) {
        if (page.id === excludeId) continue
        result.push(page)
        if (page.children?.length) flattenPages(page.children, excludeId, result)
    }
    return result
}

export default function MoveToModal() {
    const moveTo = useMoveTo()
    const { pagesList, setPagesList } = usePagesList()

    const { mutateAsync } = useMutation({
        mutationFn: moveToPage,
        onMutate: ({ id, pageId: targetId }) => {
            const previous = usePagesList.getState().pagesList
            return { previous }
        },
        onSuccess: () => {
            toast.success("Page moved")
            moveTo.onClose()
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                usePagesList.getState().setPagesList(context.previous)
            }
            toast.error("Failed to move page")
        },
    })

    const allPages = flattenPages(pagesList, moveTo.pageId ?? "")

    const handleSelect = async (targetPageId: string) => {
        if (!moveTo.pageId) return
        await mutateAsync({ id: moveTo.pageId, pageId: targetPageId })
    }

    return (
        <CommandDialog open={moveTo.isOpen} onOpenChange={moveTo.onClose}>
            <CommandInput placeholder="Move to a page..." />
            <CommandList>
                <CommandEmpty>No pages found.</CommandEmpty>
                <CommandGroup heading="Move to">
                    {allPages.map((page) => (
                        <CommandItem
                            key={page.id}
                            value={`${page.id}-${page.title}`}
                            onSelect={() => handleSelect(page.id!)}
                        >
                            {!page.icon ? icons.pageEmpty : page.icon}
                            <span className="w-[200px] truncate">{page.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
