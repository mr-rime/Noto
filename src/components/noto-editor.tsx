"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useEdgeStore } from "@/lib/edgestore";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

export type BlockType = {
    id: string;
    type: string;
    props: {
        textColor: string;
        backgroundColor: string;
        textAlignment: string;
    };
    content: { type: "text"; text: string; styles: any }[];
    children: BlockType[];
};

type NotoEditorProps = {
    autoFocus?: boolean;
    initialContent?: BlockType[];
    setDocuments: Dispatch<SetStateAction<BlockType[]>>
    setIsEditorFocused: Dispatch<SetStateAction<boolean>>;
    editable?: boolean
}

export default function NotoEditor({ autoFocus, setIsEditorFocused, initialContent, setDocuments, editable }: NotoEditorProps) {
    const { edgestore } = useEdgeStore();
    const resolvedTheme = useResolvedTheme();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }

    const debouncedOnChange = useDebounce((doc) => {
        setDocuments(doc);
    }, 300);

    const editor = useCreateBlockNote({
        initialContent: initialContent as any,
        uploadFile: handleUpload,
    });



    useEffect(() => {
        if (autoFocus && editor) {
            editor.focus();
        }
    }, [autoFocus, editor]);



    useEffect(() => {
        if (!editor) return;

        editor.onChange((e) => {
            debouncedOnChange(e.document as any);
        });

    }, [editor, debouncedOnChange]);



    return <BlockNoteView
        editor={editor}
        theme={resolvedTheme}
        title="Noto Editor"
        autoFocus={autoFocus}
        onBlur={() => setIsEditorFocused(false)}
        editable={editable}
    />;
}
