'use client'

import { useEffect } from "react";
import NotoPage from "./noto-page";
import ModalProvider from "./modal-provider";
import { PageType } from "@/types";
import { usePagesList } from "@/hooks/use-pages-list";

const MAX_PAGES = 4

export default function PagesList({ pages }: { pages: PageType[] }) {
    const { pagesList, setPagesList } = usePagesList();

    useEffect(() => {
        setPagesList(pages);
    }, [pages, setPagesList]);

    const visiblePages = pagesList.slice(0, MAX_PAGES)
    const isAtLimit = pagesList.length >= MAX_PAGES

    return (
        <div className="flex flex-col space-y-1">
            {visiblePages.map((page) => (
                <NotoPage key={page.id} {...page as any} />
            ))}

            <ModalProvider pages={pagesList as any} />
        </div>
    );
}
