'use client'

import React, { memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { cn } from '@/lib/cn';
import { useMutation } from '@tanstack/react-query';
import { updatePage } from '@/actions';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useIcon } from '@/hooks/use-icon';
import { useTheme } from '@/hooks/use-theme';

interface IconPickerProps {
    onOpen?: () => void
    onEmojiChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
    open?: boolean;
}




const IconPicker = memo(({ children, onEmojiChange, asChild, open, onOpen }: IconPickerProps) => {
    const { pageId } = useParams()
    const { mutateAsync } = useMutation({
        mutationFn: updatePage
    })
    const { user } = useUser()
    const emoji = useIcon()
    const { theme } = useTheme()

    const handleDeleteIcon = async () => {
        emoji.setIcon(" ", pageId?.[0]!)
        onOpen?.()
        await mutateAsync({
            id: pageId?.[0]!,
            icon: "",
            auth_id: user?.id!
        })
    }
    return (
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" w-full shadow-none translate-x-2 relative !z-10 dark:text-[#e8e8e7]">
                <div className=" ">
                    <div className="flex items-center justify-between w-full border-b border-[#F0F0EF] dark:border-[#3a3a3a]">
                        <div className="flex items-center space-x-1 w-full ">
                            <div className={cn(" border-[#37352F] dark:border-[#e8e8e7] border-b-2 ")}>
                                <div className="hover:bg-[#F3F3F3] dark:hover:bg-[#2d2d2d] transition-colors rounded-[6px]  text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                    Emoji
                                </div>
                            </div>
                        </div>

                        <div>
                            <div onClick={handleDeleteIcon} className="hover:bg-[#F3F3F3] dark:hover:bg-[#2d2d2d] text-[#37352f80] dark:text-[#e8e8e780] transition-colors rounded-[6px] h-[28px] text-[14px] inline-flex items-center cursor-pointer px-[8px] mb-1">
                                Remove
                            </div>
                        </div>
                    </div>
                </div>
                <Picker data={data} previewPosition={"none"} theme={theme === 'system' ? 'auto' : theme} onEmojiSelect={(emoji: any) => {
                    onEmojiChange(emoji.native)
                }} className={"!h-[100px]"} />
            </PopoverContent>
        </Popover>
    );
});

IconPicker.displayName = 'IconPicker';

export default IconPicker;
