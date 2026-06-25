import { useEffect, useState } from 'react';
import { useTheme } from './use-theme';

/**
 * Returns the actual resolved theme: "light" or "dark".
 * Handles the "system" preference by reading the OS preference.
 */
export function useResolvedTheme(): 'light' | 'dark' {
    const { theme } = useTheme();
    const [resolved, setResolved] = useState<'light' | 'dark'>(() => {
        if (theme === 'system') {
            if (typeof window === 'undefined') return 'light';
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return theme;
    });

    useEffect(() => {
        if (theme !== 'system') {
            setResolved(theme);
            return;
        }
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setResolved(mq.matches ? 'dark' : 'light');
        const handler = (e: MediaQueryListEvent) => setResolved(e.matches ? 'dark' : 'light');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [theme]);

    return resolved;
}
