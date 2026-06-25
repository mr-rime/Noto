import { db } from "@/db"
import { and } from "drizzle-orm";
import { cache } from "react"

export const getRootPages = cache(async (userId: string) => {
    const pages = await db.query.pagesTable.findMany({
        where: (pages, { eq, and, isNull }) =>
            and(
                eq(pages.auth_id, userId),
                eq(pages.isArchived, false),
                isNull(pages.parent_id)
            ),
    });

    const fetchChildrenRecursively = async (parentId: string) => {
        const children = await db.query.pagesTable.findMany({
            where: (pages, { eq, not }) => and(
                eq(pages.parent_id, parentId),
                not(eq(pages.isArchived, true))
            ),
        });

        const pagesWithChildren: Array<{ id: string;[key: string]: any; children: any[] }> = await Promise.all(
            children.map(async (child) => {
                const childWithChildren = await fetchChildrenRecursively(child.id);
                return {
                    ...child,
                    children: childWithChildren,
                };
            })
        );

        return pagesWithChildren;
    };

    const pagesWithChildren = await Promise.all(
        pages.map(async (page) => {
            const children = await fetchChildrenRecursively(page.id);
            return {
                ...page,
                children,
            };
        })
    );

    return pagesWithChildren;
});






export const getChildPages = cache(async (userId: string) => {
    return await db.query.pagesTable.findMany({
        where: (pages, { eq, and, not, isNull }) =>
            and(
                eq(pages.auth_id, userId),
                eq(pages.isArchived, false),
                not(isNull(pages.parent_id))
            )
    });
});



export const getFirstPage = cache(async (userId: string) => {
    return await db.query.pagesTable.findFirst({
        where: (pages, { eq, and, or, isNull }) => and(
            eq(pages.auth_id, userId),
            eq(pages.isArchived, false),
            or(
                isNull(pages.parent_id)
            )
        )
    })
})

export const getRecentPages = cache(async (userId: string, limit = 10) => {
    return await db.query.pagesTable.findMany({
        where: (pages, { eq }) =>
            eq(pages.auth_id, userId),
        orderBy: (pages, { desc }) => [desc(pages.updated_at)],
        limit,
    })
})
