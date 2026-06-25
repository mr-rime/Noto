"use client";

import DeletedBanner from "@/components/deleted-banner";
import NotoPageContent from "@/components/noto-page-content";
import NotoPageContentSkeleton from "@/components/noto-page-content-skeleton";
import NotoPageCover from "@/components/noto-page-cover";
import NotoPageHeader from "@/components/noto-page-header";
import NotoPageIcon from "@/components/noto-page-icon";
import { cn } from "@/lib/cn";
import { Suspense } from "react";

export default function PageContentWrapper({ page, pageId, userId }: {
    page: any,
    pageId: string,
    userId: string
}) {
    return (
        <div className="w-full ml-[var(--sidebar-width,300px)]">
            <div>
                <NotoPageHeader page={page} />
                {page.isArchived && <DeletedBanner />}
                {page?.coverUrl && <NotoPageCover page={page} />}

                <div
                    className={cn(
                        "relative w-fit mx-auto flex items-start justify-center ",
                        page?.coverUrl ? "mt-5" : "mt-28"
                    )}
                >
                    <NotoPageIcon page={page} />
                    <Suspense fallback={
                        <div className="flex items-center w-full ml-[var(--sidebar-width,300px)]">
                            <NotoPageContentSkeleton />
                        </div>
                    }>
                        <NotoPageContent pageId={pageId} page={page} userId={userId} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
