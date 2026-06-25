import { create } from "zustand";

type MoveToStore = {
    isOpen: boolean;
    pageId: string | null;
    onOpen: (pageId: string) => void;
    onClose: () => void;
};

export const useMoveTo = create<MoveToStore>((set) => ({
    isOpen: false,
    pageId: null,
    onOpen: (pageId) => set({ isOpen: true, pageId }),
    onClose: () => set({ isOpen: false, pageId: null }),
}));
