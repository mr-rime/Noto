
import DeletedBanner from "@/components/deleted-banner";
import NotFound from "@/components/not-found";
import NotoPageContent from "@/components/noto-page-content";
import NotoPageCover from "@/components/noto-page-cover";
import NotoPageHeader from "@/components/noto-page-header";
import NotoPageIcon from "@/components/noto-page-icon";
import { cn } from "@/lib/cn";
import { getPublicPageById } from "@/lib/get-pageById";
import { currentUser } from "@clerk/nextjs/server";




export default async function page({ params }: { params: Promise<{ pageId: string }> }) {
    const { pageId } = await params
    const user = await currentUser()
    const page = await getPublicPageById(pageId)

    if (!page) return <NotFound />
    if (!page.isPublished && page.auth_id !== user?.id) return <NotFound />

    return (
        <div className="w-full ml-[var(--sidebar-width,300px)]">

            <div>
                <NotoPageHeader page={page as any} />
                {
                    page.isArchived && <DeletedBanner />
                }
                {
                    page?.coverUrl && <NotoPageCover page={page as any} />
                }

                <div className={cn("relative w-fit mx-auto flex items-start justify-center ", page?.coverUrl ? "mt-5" : "mt-28")}>
                    <NotoPageIcon page={page as any} />
                    <NotoPageContent pageId={pageId} page={page as any} userId={user?.id!} />
                </div>
            </div>
        </div>
    )
}