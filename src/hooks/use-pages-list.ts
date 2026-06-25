import { PageType } from "@/types";
import { create } from "zustand";

type PagesListStoreProps = {
    pagesList: PageType[]
    setPagesList: (pagesList: PageType[]) => void
};

export const usePagesList = create<PagesListStoreProps>((set) => ({
    pagesList: [],
    setPagesList: (pagesList) => set({ pagesList })
}));

export const addOptimisticChildToTree = (pages: PageType[], parentId: string, child: PageType): PageType[] => {
    return pages.map(page => {
        if (page.id === parentId) {
            return {
                ...page,
                children: [...(page.children || []), child]
            };
        }
        if (page.children && page.children.length > 0) {
            return {
                ...page,
                children: addOptimisticChildToTree(page.children, parentId, child)
            };
        }
        return page;
    });
};

export const replaceOptimisticChildInTree = (pages: PageType[], parentId: string, tempId: string, realChild?: PageType): PageType[] => {
    return pages.map(page => {
        if (page.id === parentId) {
            return {
                ...page,
                children: page.children?.map(c => c.id === tempId ? (realChild || c) : c).filter(c => realChild ? true : c.id !== tempId)
            };
        }
        if (page.children && page.children.length > 0) {
            return {
                ...page,
                children: replaceOptimisticChildInTree(page.children, parentId, tempId, realChild)
            };
        }
        return page;
    });
};

export const removeNodeFromTree = (pages: PageType[], idToRemove: string): PageType[] => {
    return pages.filter(page => page.id !== idToRemove).map(page => ({
        ...page,
        children: page.children ? removeNodeFromTree(page.children, idToRemove) : []
    }));
};
