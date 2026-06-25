'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    useEffect(() => {
        const root = document.documentElement;
        const applyTheme = (isDark: boolean) => {
            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        if (theme === 'system') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            applyTheme(mq.matches);
            const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        } else {
            applyTheme(theme === 'dark');
        }
    }, [theme]);

    return <>{children}</>;
}
