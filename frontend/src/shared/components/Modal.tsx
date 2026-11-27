import { createPortal } from "react-dom"
import { useEffect, useId, useRef } from "react"
import type { ReactNode } from "react"
import { X } from "lucide-react"

import { cn } from "../lib/utils"

type ModalSize = "sm" | "md" | "lg" | "xl"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: ModalSize
  closeOnBackdrop?: boolean
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const modalContainer = document.getElementById("modal-root")

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  if (!modalContainer) {
    throw new Error("Portal container not found")
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          onClose()
        }
      }}
      className={cn(
        "fixed inset-0 m-auto w-[calc(100%-2rem)]",
        "max-h-[90dvh] overflow-hidden",
        "rounded-xl border border-slate-200",
        "bg-white p-0 shadow-xl",
        "backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm",
        sizeClasses[size]
      )}
    >
      <div className="flex max-h-[90dvh] flex-col">
        {/* Header */}
        <header
          className={cn(
            "flex shrink-0 items-start gap-4",
            "border-b border-slate-200 p-5"
          )}
        >
          {icon && (
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center",
                "rounded-xl bg-blue-50 text-blue-600"
              )}
            >
              {icon}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2
              id={titleId}
              className="text-lg font-semibold text-slate-900"
            >
              {title}
            </h2>

            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-sm text-slate-500"
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className={cn(
              "shrink-0 rounded-lg p-2",
              "text-slate-400 transition",
              "hover:bg-slate-100 hover:text-slate-700"
            )}
          >
            <X size={20} />
          </button>
        </header>

        {/* Body */}
        <div className="min-h-0 overflow-y-auto p-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <footer
            className={cn(
              "flex shrink-0 items-center justify-end gap-3",
              "border-t border-slate-200",
              "bg-slate-50 px-5 py-4"
            )}
          >
            {footer}
          </footer>
        )}
      </div>
    </dialog>,
    modalContainer
  )
}