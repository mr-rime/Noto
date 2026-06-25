import DeletedBanner from "@/components/deleted-banner";
import NotFound from "@/components/not-found";
import NotoPageContent from "@/components/noto-page-content";
import NotoPageContentSkeleton from "@/components/noto-page-content-skeleton";
import CoverWrapper from "@/components/cover-wrapper";
import NotoPageHeader from "@/components/noto-page-header";
import NotoPageIcon from "@/components/noto-page-icon";
import { cn } from "@/lib/cn";
import { getPageById } from "@/lib/get-pageById";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ pageId: string }> }) {
    const { pageId } = await params;

    const user = await currentUser();
    const page = await getPageById(pageId, user?.id!);

    if (!page) return <NotFound />;

    return (
        <div className="w-full ml-[var(--sidebar-width,300px)]">
            <div>
                <NotoPageHeader page={page as any} />
                {page.isArchived && <DeletedBanner />}
                
                <CoverWrapper page={page as any}>
                    <NotoPageIcon page={page as any} />
                    <Suspense fallback={<NotoPageContentSkeleton />}>
                        <NotoPageContent pageId={pageId} page={page as any} userId={user?.id!} />
                    </Suspense>
                </CoverWrapper>
            </div>
        </div>
    );
}
