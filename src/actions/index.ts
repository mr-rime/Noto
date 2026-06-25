
'use server'

import { BlockType } from "@/components/noto-editor";
import { db } from "@/db"
import { pagesTable } from "@/db/schema"
import { type PageType } from "@/types"
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const createPage = async ({ title, content, type, auth_id, id, currentPageId }: PageType & { currentPageId?: string }) => {
    try {
        const data = await db
            .insert(pagesTable)
            .values({ id: id!, auth_id: auth_id!, title: title!, content, type })
            .returning();

        revalidatePath(`/pages`);
        if (currentPageId || id) revalidatePath(`/pages/${currentPageId}`);

        return data[0];
    } catch (err: any) {
        throw new Error(err);
    }
};


export const updatePage = async ({ id, title, content, currentPageId, coverUrl, icon, isArchived, auth_id, isPublished }: {
    id: string,
    title?: string,
    content?: BlockType[],
    currentPageId?: string,
    coverUrl?: string,
    icon?: string,
    isArchived?: boolean,
    auth_id?: string,
    isPublished?: boolean
}) => {
    try {
        const data = await db
            .update(pagesTable)
            .set({
                title,
                content,
                updated_at: new Date(),
                coverUrl,
                icon,
                isArchived,
                isPublished
            })
            .where(and(eq(pagesTable.id, id), auth_id ? eq(pagesTable.auth_id, auth_id) : undefined))
            .returning({ id: pagesTable.id });

        revalidatePath(`/pages`)
        if (currentPageId) revalidatePath(`/pages/${currentPageId}`);

        return { id: data[0].id };
    } catch (err: any) {
        throw new Error(err);
    }
};

export const deletePage = async ({ id }: { id: string }) => {
    try {
        const deleteChildren = async (parentId: string) => {
            const children = await db.query.pagesTable.findMany({
                where: (pages, { eq }) => eq(pages.parent_id, parentId),
            });

            for (const child of children) {
                await deleteChildren(child.id);
                await db.delete(pagesTable).where(eq(pagesTable.id, child.id)); // Delete the child page
            }
        };

        await deleteChildren(id);

        await db.delete(pagesTable).where(eq(pagesTable.id, id));

        revalidatePath(`/pages/${id}`);
        revalidatePath(`/pages`);

    } catch (err: any) {
        throw new Error(err);
    }
};



export const moveToPage = async ({ id, pageId }: { id: string, pageId: string }) => {
    try {
        const data = await db
            .update(pagesTable)
            .set({ parent_id: pageId })
            .where(eq(pagesTable.id, id))
            .returning({ id: pagesTable.id });

        revalidatePath("/pages");
        revalidatePath(`/pages/${id}`);

        return { id: data[0].id };
    } catch (err: any) {
        throw new Error(err);
    }
};

export const duplicatePage = async ({ id, auth_id }: { id: string; auth_id: string }) => {
    try {
        const source = await db.query.pagesTable.findFirst({
            where: (pages, { eq, and }) => and(eq(pages.id, id), eq(pages.auth_id, auth_id)),
        });

        if (!source) throw new Error("Page not found");

        const data = await db
            .insert(pagesTable)
            .values({
                auth_id: source.auth_id,
                title: `${source.title} (copy)`,
                content: source.content as any,
                type: source.type,
                icon: source.icon ?? undefined,
                coverUrl: source.coverUrl ?? undefined,
                parent_id: source.parent_id ?? undefined,
                isArchived: false,
                isPublished: false,
            })
            .returning();

        revalidatePath("/pages");
        if (source.parent_id) revalidatePath(`/pages/${source.parent_id}`);

        return data[0];
    } catch (err: any) {
        throw new Error(err);
    }
};

export const createPageInside = async ({ parentId, auth_id }: { parentId: string, auth_id: string }) => {
    try {
        const data = await db
            .insert(pagesTable)
            .values({
                auth_id,
                title: "New Page",
                parent_id: parentId,
            })
            .returning();

        revalidatePath(`/pages/${parentId}`);
        revalidatePath(`pages`);

        return data[0];
    } catch (err: any) {
        throw new Error(err);
    }
};
