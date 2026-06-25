'use client'

import { PageType } from "@/types"
import NotoPageCover from "./noto-page-cover"
import { useCoverImage } from "@/hooks/use-cover-image"
import { cn } from "@/lib/cn"
import { useEffect } from "react"
import { useParams } from "next/navigation"

export default function CoverWrapper({ page, children }: { page: PageType, children: React.ReactNode }) {
    const coverImage = useCoverImage()
    const params = useParams()

    useEffect(() => {
        // clear optimistic cover when navigating to a different page
        coverImage.onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.pageId])

    // If url is " ", it means we optimistically removed the cover
    const isRemoved = coverImage.url === " "
    const hasCover = !!(page.coverUrl || coverImage.url)
    const showCover = hasCover && !isRemoved

    return (
        <>
            {showCover && <NotoPageCover page={page} />}
            <div
                className={cn(
                    "relative w-fit mx-auto flex items-start justify-center",
                    showCover ? "mt-5" : "mt-28"
                )}
            >
                {children}
            </div>
        </>
    )
}
