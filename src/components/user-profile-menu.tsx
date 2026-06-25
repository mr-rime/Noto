'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { useTheme, Theme } from '@/hooks/use-theme';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Image from 'next/image';
import { LogOut, Monitor, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun size={14} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={14} /> },
    { value: 'system', label: 'System', icon: <Monitor size={14} /> },
];

export default function UserProfileMenu({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const { signOut } = useClerk();
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children as React.ReactElement}
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="start"
                sideOffset={8}
                className="w-[240px] p-0 shadow-lg rounded-[10px] border border-[#E8E8E7] dark:border-[#3a3a3a] dark:bg-[#1f1f1f] overflow-hidden"
            >
                {/* Profile section */}
                <div className="px-3 py-3 border-b border-[#E8E8E7] dark:border-[#3a3a3a]">
                    <div className="flex items-center space-x-2">
                        <Image
                            src={user?.imageUrl || ''}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-[6px] flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-semibold text-[#37352F] dark:text-[#e8e8e7] truncate">
                                {user?.fullName || user?.firstName}
                            </span>
                            <span className="text-[11px] text-[#9E9A97] dark:text-[#6b6b68] truncate">
                                {user?.primaryEmailAddress?.emailAddress}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Theme section */}
                <div className="px-2 py-2 border-b border-[#E8E8E7] dark:border-[#3a3a3a]">
                    <div className="text-[11px] font-medium text-[#9E9A97] dark:text-[#6b6b68] uppercase tracking-wide px-2 mb-1.5">
                        Appearance
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-[#F0F0EF] dark:bg-[#2d2d2d] rounded-[8px]">
                        {themes.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTheme(t.value)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[6px] text-[12px] font-medium transition-all cursor-pointer ${
                                    theme === t.value
                                        ? 'bg-white dark:bg-[#404040] text-[#37352F] dark:text-[#e8e8e7] shadow-sm'
                                        : 'text-[#9E9A97] dark:text-[#6b6b68] hover:text-[#37352F] dark:hover:text-[#e8e8e7]'
                                }`}
                            >
                                {t.icon}
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sign out */}
                <div className="px-2 py-2">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-2.5 px-2 py-2 rounded-[6px] text-[13px] text-[#5E5C57] dark:text-[#9e9a97] hover:bg-[#F0F0EF] dark:hover:bg-[#2d2d2d] hover:text-[#37352F] dark:hover:text-[#e8e8e7] transition-colors cursor-pointer"
                    >
                        <LogOut size={14} className="text-[#9E9A97] dark:text-[#6b6b68]" />
                        <span>Log out</span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
