
'use client'

import { PageType } from "@/types";
import Image from "next/image";
import { CoverImage } from "./cover-image";
import { useUser } from "@clerk/nextjs";
import { useCoverImage } from "@/hooks/use-cover-image";

export default function NotoPageCover({ page }: { page: PageType }) {
    const { user } = useUser()
    const coverImage = useCoverImage()
    return (
        <div className="w-full h-[30vh] overflow-hidden relative group">
            <div className="absolute top-5 right-32">
                <CoverImage>
                    {
                        !page.isArchived && page.auth_id === user?.id && <div className=" w-fit h-fit flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white dark:bg-[#1f1f1f] hover:bg-[#EFEFEE] dark:hover:bg-[#2d2d2d] text-[#7D7C78] dark:text-[#e8e8e7] text-[14px] px-2 py-1 rounded-sm cursor-pointer transition-all duration-200 ease-in-out z-10 border border-[#EDEDEC] dark:border-[#3a3a3a]">
                            Change cover
                        </div>
                    }
                </CoverImage>
            </div>
            <Image src={coverImage.url || page?.coverUrl!} alt="cover" priority width={1000} height={1000} className="w-full h-full object-cover object-center" />
        </div>
    )
}
