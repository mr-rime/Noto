'use client'

import { icons } from "@/constants/icons"
import NotoTooltip from "./noto-tooltip"
import SidebarItem from "./sidebar-item"
import { type PageType } from "@/types"
import Link from "next/link"
import { cn } from "@/lib/cn"
import { usePathname } from "next/navigation"
import { useDocuments } from "@/hooks/use-documents"
import ControlMenu from "./control-menu"
import { useMemo, useState, useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { createPageInside } from "@/actions"
import { useUser } from "@clerk/nextjs"
import { useIcon } from "@/hooks/use-icon"
import { usePagesList, addOptimisticChildToTree, replaceOptimisticChildInTree } from "@/hooks/use-pages-list"
import { toast } from "sonner"

export interface NotoPageProps extends PageType {
  empty?: boolean
  depth?: number
}

export default function NotoPage({ id, title, icon, children, depth = 0 }: NotoPageProps) {
  const [open, setOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pagesList = usePagesList()

  const { mutateAsync } = useMutation({
    mutationFn: createPageInside,
    onMutate: async () => {
        const tempId = `temp-${Date.now()}`
        
        const optimisticPage: PageType = {
            id: tempId,
            title: "New Page",
            auth_id: user?.id!,
            isArchived: false,
            content: [],
            type: 'empty',
            isPublished: false,
            created_at: new Date(),
            updated_at: new Date(),
            children: [],
        }

        const previousPages = usePagesList.getState().pagesList
        
        usePagesList.getState().setPagesList(addOptimisticChildToTree(previousPages, id!, optimisticPage))

        setIsCollapsed(true)
        
        return { previousPages, tempId }
    },
    onSuccess: (data, _variables, context) => {
        const current = usePagesList.getState().pagesList
        const realChild = { children: [], ...(data as any) }
        usePagesList.getState().setPagesList(
            replaceOptimisticChildInTree(current, id!, context?.tempId!, realChild)
        )
    },
    onError: (_err, _variables, context) => {
        if (context?.previousPages) {
            usePagesList.getState().setPagesList(context.previousPages)
        }
        toast.error("Failed to create nested page")
    }
  })
  const { user } = useUser()
  const emoji = useIcon()
  const pathname = usePathname()
  const document = useDocuments()
  const currentTitle = document.id === id ? document.title : title


  const onOpen = () => {
    setOpen(prev => !prev)
  }


  const handleOpenControlMenu = async (e: React.MouseEvent) => {
    e.preventDefault()
    onOpen()
  }

  const resolvedChildren = useMemo(() => {
    const liveChildren = pagesList.pagesList
      ? (function findChildren(pages: PageType[]): PageType[] | undefined {
          for (const p of pages) {
            if (p.id === id) return p.children
            if (p.children?.length) {
              const found = findChildren(p.children)
              if (found !== undefined) return found
            }
          }
        })(pagesList.pagesList)
      : children
    return liveChildren ?? children
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesList.pagesList, id, children])

  const doAddPageInside = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    if (resolvedChildren && resolvedChildren.length >= 4) {
      toast.error("You can only have 4 pages inside a page")
      return
    }
    await mutateAsync({
      auth_id: user?.id!,
      parentId: id!
    })
  }, [user, id, mutateAsync, resolvedChildren])

  const onCollapse = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCollapsed(prev => !prev)
  }


  const memoizedChildrenList = useMemo(() => {
    if (!resolvedChildren || resolvedChildren.length === 0) return <div className="text-[#989793] text-[13px] w-fit mt-1 ml-3 select-none">
      No pages inside
    </div>
    return resolvedChildren.map((page) => <NotoPage key={page.id} {...page} depth={depth + 1} />)
  }, [resolvedChildren, depth])

  return (
    <>
      <Link prefetch href={`/pages/${id}`}>
        <SidebarItem className={cn("hover:!text-[#5E5C57] text-[#91918E] text-[13px] font-semibold px-2 group truncate ", pathname.includes(id!) ? "bg-[#F0F0EF] text-[#5E5C57]" : "")} >
          <div className="flex items-center space-x-2">
            <div className="relative w-5 h-5 group">
              <div className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                {(emoji.pageId === id && emoji.icon) || icon || icons.pageEmpty}
              </div>

              <div
                onClick={onCollapse}
                className="absolute inset-0 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[#e5e5e4] flex items-center justify-center rounded cursor-pointer"
              >
                <span
                  className={`transition-transform duration-300 ease-in-out ${!isCollapsed ? "rotate-0" : "rotate-90"
                    }`}
                >
                  {icons.chevronDownRoundedThick}
                </span>
              </div>
            </div>
            <div className="truncate text-[#5E5C57] w-[150px]">
              {currentTitle || "New Page"}
            </div>
          </div>

          <div className="flex items-center space-x-1 relative ">
            <NotoTooltip content="Delete, duplicate, and more...">
              <ControlMenu pageId={id!} open={open} onOpen={onOpen}>
                <div
                  className="hover:bg-[#E8E8E8] h-[20px] w-[20px] rounded-[4px] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"

                  onClick={handleOpenControlMenu}
                >
                  {icons.ellipsis}
                </div>
              </ControlMenu>
            </NotoTooltip>
            {depth < 4 && (
              <NotoTooltip content={resolvedChildren && resolvedChildren.length >= 4 ? "Page limit reached (max 4)" : "Add a page inside"}>
                <div
                  className={cn("h-[20px] w-[20px] rounded-[4px] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100",
                    resolvedChildren && resolvedChildren.length >= 4 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#E8E8E8] cursor-pointer"
                  )}
                  onClick={doAddPageInside}
                >
                  {icons.plus}
                </div>
              </NotoTooltip>
            )}

          </div>
        </SidebarItem>

      </Link>
      {
        isCollapsed && (
          <div className="ml-5 mt-0.5">
            {
              memoizedChildrenList
            }

          </div>
        )
      }
    </>
  )
}
