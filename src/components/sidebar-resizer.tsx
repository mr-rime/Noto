'use client';

import { useEffect, useRef } from 'react';
import { GripVertical } from 'lucide-react';

export default function SidebarResizer() {
    const isResizing = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing.current) return;
            let newWidth = e.clientX;
            if (newWidth < 240) newWidth = 240; // min width
            if (newWidth > 600) newWidth = 600; // max width
            document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
        };

        const handleMouseUp = () => {
            if (isResizing.current) {
                isResizing.current = false;
                document.body.style.cursor = 'default';
                localStorage.setItem('sidebarWidth', document.documentElement.style.getPropertyValue('--sidebar-width'));
            }
        };

        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth) {
            document.documentElement.style.setProperty('--sidebar-width', savedWidth);
        } else {
            // Default width
            document.documentElement.style.setProperty('--sidebar-width', '300px');
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div
            className="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-[#c9c9c9] transition-colors z-30 flex items-center justify-center group/resizer"
            onMouseDown={(e) => {
                e.preventDefault();
                isResizing.current = true;
                document.body.style.cursor = 'col-resize';
            }}
        />
    );
}
