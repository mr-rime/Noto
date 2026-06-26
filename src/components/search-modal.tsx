'use client'

import { useSearch } from "@/hooks/use-search";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { PageType } from "@/types";
import { icons } from "@/constants/icons";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { usePagesList } from "@/hooks/use-pages-list";

type FlatPage = PageType & { breadcrumb: string }

/** Recursively flatten the whole tree into a flat list with breadcrumb trails */
function flattenTree(pages: PageType[], ancestors: string[] = []): FlatPage[] {
    const result: FlatPage[] = []
    for (const page of pages) {
        if (page.isArchived) continue;
        result.push({ ...page, breadcrumb: ancestors.join(" / ") })
        if (page.children?.length) {
            result.push(...flattenTree(page.children, [...ancestors, page.title || "Untitled"]))
        }
    }
    return result
}

export default function SearchModal({ pages }: { pages: PageType[] }) {
    const search = useSearch()
    const router = useRouter()
    const onOpen = useSearch(store => store.onOpen)
    // Always use live Zustand state so newly created pages appear instantly
    const livePages = usePagesList(store => store.pagesList)
    const sourcePages = livePages.length > 0 ? livePages : pages

    const [query, setQuery] = useState("")

    const visiblePages = useMemo(() => {
        if (!query.trim()) {
            // No search query — show only root pages (no breadcrumb clutter)
            return sourcePages.filter(p => !p.isArchived).map(p => ({ ...p, breadcrumb: "" })) as FlatPage[]
        }
        // Actively searching — show all pages including nested ones
        return flattenTree(sourcePages)
    }, [query, sourcePages])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpen();
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onOpen]);

    // Reset query when modal closes
    useEffect(() => {
        if (!search.isOpen) setQuery("")
    }, [search.isOpen])

    const onSelect = (id: string) => {
        router.push(`/pages/${id}`)
        search.onClose()
    }

    return (
        <CommandDialog open={search.isOpen} onOpenChange={search.onClose}>
            <CommandInput
                placeholder="Search pages..."
                value={query}
                onValueChange={setQuery}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    {visiblePages.map((page) => (
                        <CommandItem
                            key={page.id}
                            value={`${page.id}-${page.title || "Untitled"}`}
                            onSelect={() => onSelect(page.id!)}
                        >
                            <span className="shrink-0">
                                {!page.icon ? icons.pageEmpty : page.icon}
                            </span>
                            <div className="flex flex-col min-w-0">
                                <span className="truncate text-[13px] text-[#37352F] font-medium">
                                    {page.title || "Untitled"}
                                </span>
                                {page.breadcrumb && (
                                    <span className="truncate text-[11px] text-[#9B9A97]">
                                        {page.breadcrumb}
                                    </span>
                                )}
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
