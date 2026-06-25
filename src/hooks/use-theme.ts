import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

type ThemeStore = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const useTheme = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => set({ theme }),
        }),
        { name: 'noto-theme' }
    )
);
