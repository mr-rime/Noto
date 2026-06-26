'use client'
import { icons } from "@/constants/icons";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useMutation } from "@tanstack/react-query";
import { updatePage } from "@/actions";
import { useIsSaving } from "@/hooks/use-is-saving";
import { useDocuments } from "@/hooks/use-documents";
import { useCoverImage } from "@/hooks/use-cover-image";
import { PageType } from "@/types";
import { cn } from "@/lib/cn";
import { addRandomEmoji, addRandomImage } from "@/lib/add-random-image";
import { useUser } from "@clerk/nextjs";
import { useIcon } from "@/hooks/use-icon";
import { usePagesList, updateNodeInTree } from "@/hooks/use-pages-list";

type NotoPageTitleEditorProps = {
  page: PageType;
  setIsEnabled?: Dispatch<SetStateAction<boolean>>;
  isEditorFocused?: boolean;
};

export default function NotoPageTitleEditor({ page }: NotoPageTitleEditorProps) {
  const { mutateAsync } = useMutation({ mutationFn: updatePage });
  const { user } = useUser()
  const icon = useIcon()

  const coverImage = useCoverImage();
  const setIsSaving = useIsSaving((state) => state.setIsSaving);
  const document = useDocuments();

  const [title, setTitle] = useState(page.title || "");
  const [emoji, setEmoji] = useState(page.icon || "");
  const debouncedTitleChange = useDebounce(setTitle, 300);
  const pageId = page.id;

  const handleSave = useCallback(async () => {
    if (!pageId || (title === page.title && emoji === page.icon)) return;

    setIsSaving(true);
    await mutateAsync({ id: pageId, title, icon: emoji, auth_id: user?.id });
    setIsSaving(false);
  }, [title, emoji, pageId, page.title, page.icon, mutateAsync, setIsSaving, user?.id]);

  const updateRandomImage = async () => {
    if (!pageId) return;
    const url = addRandomImage();
    coverImage.onReplace(url);
    await mutateAsync({ id: pageId, coverUrl: url });
  };

  const updateRandomIcon = () => {
    const emoji = addRandomEmoji()
    icon.setIcon(emoji, pageId!)
    setEmoji(emoji);
    const { pagesList, setPagesList } = usePagesList.getState();
    setPagesList(updateNodeInTree(pagesList, pageId!, { icon: emoji }));
  };

  useEffect(() => {
    document.setTitle(title, pageId!);
  }, [title, pageId]);

  useEffect(() => {
    handleSave();
  }, [title, emoji]);

  return (
    <div className={cn("group w-fit h-fit", page.coverUrl ? "mt-3" : "mt-7")}>
      {
        !page.isArchived && page.auth_id === user?.id && <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all">
          {!(icon.pageId === page.id && icon.icon) && !page.icon && (
            <div onClick={updateRandomIcon} className="flex items-center w-fit py-1 px-2 cursor-pointer rounded-[6px] hover:bg-[#f3f3f3] dark:hover:bg-[#2d2d2d] transition-colors text-[#9B9A97] dark:text-[#e8e8e7]">
              <div>{icons.emoji}</div>
              <span className="text-[14px]">Add icon</span>
            </div>
          )}
          {!page.coverUrl && (
            <div onClick={updateRandomImage} className="flex items-center w-fit py-1 px-2 cursor-pointer rounded-[6px] hover:bg-[#f3f3f3] dark:hover:bg-[#2d2d2d] transition-colors text-[#9B9A97] dark:text-[#e8e8e7]">
              <div>{icons.image}</div>
              <span className="text-[14px]">Add cover</span>
            </div>
          )}
        </div>
      }

      {
        !page.isArchived && page.auth_id === user?.id
          ? <Input
            className="border-none shadow-none focus:!outline-none focus:!ring-0 placeholder:text-[#E1E1E0] dark:placeholder:text-[#3a3a3a] placeholder:text-[40px] placeholder:font-bold h-[80px] !text-[40px] !text-[#37352F] dark:!text-[#e8e8e7] dark:!bg-transparent font-bold p-0 !rounded-none"
            onChange={(e) => {
              const value = e.target.value;
              debouncedTitleChange(value);
              document.setTitle(value, pageId!);
            }}
            value={document.title || ""}
            placeholder="New Page"
          /> :
          <Input
            className="border-none shadow-none focus:!outline-none focus:!ring-0 placeholder:text-[#E1E1E0] dark:placeholder:text-[#3a3a3a] placeholder:text-[40px] placeholder:font-bold h-[80px] !text-[40px] !text-[#37352F] dark:!text-[#e8e8e7] dark:!bg-transparent font-bold p-0 !rounded-none"
            readOnly
            value={document.title || ""}
            placeholder="New Page"
          />

      }
    </div>
  );
}
