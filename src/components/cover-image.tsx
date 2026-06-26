'use client';

import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "./signle-image-dropzone";
import { useCallback, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useParams } from "next/navigation";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { GALLERY } from "@/constants/gallery";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useUser } from "@clerk/nextjs";

interface CoverImageProps {
    children: React.ReactNode;
}

export function CoverImage({ children }: CoverImageProps) {
    const [file, setFile] = useState<File>();
    const [tab, setTab] = useState<"gallery" | "upload">("gallery");
    const [open, setOpen] = useState(false);
    const { pageId } = useParams();
    const [isUploading, setIsUploading] = useState(false);
    const { edgestore } = useEdgeStore();
    const { user } = useUser()
    const { mutateAsync } = useMutation({ mutationFn: updatePage });
    const coverImage = useCoverImage();

    const handleTabChange = useCallback((tab: "gallery" | "upload") => {
        setTab(tab);
    }, []);

    const onOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const handleUploadOnChange = useCallback(
        async (file?: File) => {
            if (!file || !pageId?.[0]) return;
            setIsUploading(true);
            setFile(file);

            try {
                const res = await edgestore.publicFiles.upload({
                    file,
                    options: { replaceTargetUrl: coverImage.url },
                });

                coverImage.onReplace(res.url);

                await mutateAsync({ id: pageId[0], coverUrl: res.url, auth_id: user?.id! });
            } finally {
                setIsUploading(false);
                setFile(undefined);
                setOpen(false);
            }
        },
        [coverImage, edgestore.publicFiles, mutateAsync, pageId, user?.id]
    );

    const handleAddLocalCover = useCallback(
        async (url: string) => {
            if (!pageId?.[0]) return;
            coverImage.onReplace(url);
            setIsUploading(true);
            setOpen(false);

            try {
                await mutateAsync({ id: pageId[0], coverUrl: url });
            } finally {
                setIsUploading(false);
            }
        },
        [mutateAsync, pageId, coverImage]
    );


    const handleRemoveCover = useCallback(async () => {
        try {
            setIsUploading(true);
            coverImage.onReplace(" ");
            setOpen(false);
            await mutateAsync({
                id: pageId?.[0]!,
                coverUrl: ""
            })
        } finally {
            setIsUploading(false);
        }
    }, [mutateAsync, pageId, coverImage])

    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent className="relative w-[540px] max-w-[calc(100vw-24px)] h-full max-h-[485px] z-10 -left-[70px] dark:text-[#e8e8e7]">
                <div className="my-5">
                    <div className="flex items-center justify-between w-full border-b border-[#F0F0EF] dark:border-[#3a3a3a]">
                        <div className="flex items-center space-x-1 w-full">
                            {["gallery", "upload"].map((option) => (
                                <div
                                    key={option}
                                    className={cn(
                                        "border-[#37352F] dark:border-[#e8e8e7]",
                                        tab === option ? "border-b-2 text-[#37352F] dark:text-[#e8e8e7]" : "text-[#37352f80] dark:text-[#e8e8e780]"
                                    )}
                                >
                                    <div
                                        onClick={() => handleTabChange(option as "gallery" | "upload")}
                                        className="hover:bg-[#F3F3F3] dark:hover:bg-[#2d2d2d] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1"
                                    >
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div onClick={handleRemoveCover} className="hover:bg-[#F3F3F3] dark:hover:bg-[#2d2d2d] text-[#37352f80] dark:text-[#e8e8e780] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                            Remove
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-start">
                    {tab === "gallery" ? (
                        <div className="w-full">
                            {Object.entries(GALLERY).map(([categoryName, images]) => (
                                <div key={categoryName}>
                                    <div className="text-[#7D7C78] dark:text-[#9B9A97] text-[14px] mb-2 font-medium">
                                        {categoryName}
                                    </div>

                                    <div className="flex flex-wrap px-[12px] content-start">
                                        {images.map((imageUrl, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleAddLocalCover(imageUrl)}
                                                className="w-[25%] p-[3px] cursor-pointer hover:opacity-85 hover:bg-white"
                                            >
                                                <Image
                                                    src={imageUrl}
                                                    alt=""
                                                    width={1000}
                                                    height={1000}
                                                    className="w-full h-[64px] object-cover object-center block select-none rounded-[6px]"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full">
                            <SingleImageDropzone
                                className={cn("!w-full outline-none ", isUploading && "opacity-50")}
                                value={file}
                                onChange={handleUploadOnChange}
                                height={50}
                                width={10000}
                                disabled={isUploading}
                                dropzoneOptions={{
                                    maxSize: 5 * 1024 * 1024, // 5mb
                                    accept: {
                                        "image/png": [".png"],
                                        "image/jpeg": [".jpeg", ".jpg"],
                                        "image/gif": [".gif"],
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
