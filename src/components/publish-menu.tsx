'use client'

import { Check, Copy, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { PageType } from "@/types";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export default function PublishMenu({ children, page }: { children: React.ReactNode, page: PageType }) {
    const [copied, setCopied] = useState(false)
    const { user } = useUser()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: updatePage
    })

    const origin = useOrigin()

    const url = `${origin}/pages/public/${page.id}`


    const handlePublish = async () => {
        await mutateAsync({
            id: page.id!,
            auth_id: user?.id!,
            isPublished: true
        })
    }

    const handleUnpublish = async () => {
        await mutateAsync({
            id: page.id!,
            auth_id: user?.id!,
            isPublished: false
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        });
    }



    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-[456px] min-w-[180px] max-w-[calc(-24px + 100vw)] shadow-none -translate-x-5  relative !z-20 p-4 rounded-[10px] flex flex-col items-center justify-center ">
                {
                    !page.isPublished ? <>
                        <div className="mb-3">
                            <Globe color="#37352F" size={50} />
                        </div>
                        <div className="text-[#37352F] text-[18px] font-medium mb-4">
                            Publish to web
                        </div>
                    </> : <div className="w-full">
                        <div className="flex items-center space-x-2">
                            <Globe color="#2383E2" size={20} />
                            <span className="text-[#2383E2]">This page is published to web</span>
                        </div>

                        <div className="flex items-center my-5 w-full">
                            <input
                                className="w-full px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                value={url}
                                disabled
                            />
                            <Button
                                onClick={handleCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none bg-[#2383E2] hover:bg-[#0077D4] cursor-pointer"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                }

                {
                    !page.isPublished ? <>
                        {
                            isPending ? <Button className="cursor-pointer bg-[#2383E2] rounded-[5px] flex items-center justify-center h-[28px] hover:bg-[#0077D4] w-full">
                                Publishing...
                            </Button> : <Button onClick={handlePublish} className="cursor-pointer bg-[#2383E2] rounded-[5px] flex items-center justify-center h-[28px] hover:bg-[#0077D4] w-full dark:text-white">
                                Publish
                            </Button>
                        }
                    </> : isPending ? <Button variant={"outline"} className="cursor-pointer  rounded-[5px] flex items-center justify-center h-[28px] w-full">
                        Unpublish...
                    </Button> : <Button onClick={handleUnpublish} variant={"outline"} className="cursor-pointer  rounded-[5px] flex items-center justify-center h-[28px] w-full">
                        Unpublish
                    </Button>
                }
            </PopoverContent>
        </Popover >
    )
}
