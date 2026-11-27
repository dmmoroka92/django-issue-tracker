import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../lib/utils"
import type { PaginationMeta } from "../api/types"

type PaginationItem = number | "ellipsis"

type PaginationProps = {
  pagination: PaginationMeta
  total: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

const getPaginationPages = (
  currentPage: number,
  totalPages: number
): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    )
  }

  const visiblePages = [
    1,
    2,
    3,
    currentPage,
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ]

  const uniquePages = [...new Set(visiblePages)].sort(
    (a, b) => a - b
  )

  const pages: PaginationItem[] = []

  uniquePages.forEach((page, index) => {
    if (index > 0) {
      const previousPage = uniquePages[index - 1]
      const hasGap = page - previousPage > 1
  
      if (hasGap) {
        pages.push("ellipsis")
      }
    }
  
    pages.push(page)
  })

  return pages
}

export const Pagination = ({
  pagination,
  total,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  const {
    currentPage,
    pageSize,
    totalPages,
    nextPage,
    previousPage,
  } = pagination

  if (totalPages <= 1) return null

  const pages = getPaginationPages(currentPage, totalPages)

  const firstRecord = (currentPage - 1) * pageSize + 1
  const lastRecord = Math.min(currentPage * pageSize, total)

  const buttonClass = cn(
    "flex h-9 min-w-9 items-center justify-center",
    "rounded-lg border px-2 text-sm font-medium",
    "transition disabled:cursor-not-allowed disabled:opacity-40"
  )

  const defaultButtonClass = cn(
    "border-slate-200 bg-white text-slate-600",
    "hover:bg-slate-50"
  )

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        "border-t border-slate-200 pt-4"
      )}
    >
      <p className="text-sm text-slate-500">
        Showing {firstRecord}–{lastRecord} of {total} records
      </p>

      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={disabled || previousPage === null}
          onClick={() => {
            if (previousPage !== null) {
              onPageChange(previousPage)
            }
          }}
          className={cn(buttonClass, defaultButtonClass)}
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-slate-400"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              disabled={disabled}
              onClick={() => onPageChange(page)}
              className={cn(
                buttonClass,
                page === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : defaultButtonClass
              )}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          aria-label="Next page"
          disabled={disabled || nextPage === null}
          onClick={() => {
            if (nextPage !== null) {
              onPageChange(nextPage)
            }
          }}
          className={cn(buttonClass, defaultButtonClass)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  )
}