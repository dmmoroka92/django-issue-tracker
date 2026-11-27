import { TriangleAlert } from "lucide-react"
import { Modal } from "./Modal"
import { cn } from "../lib/utils"

type ConfirmationModalProps = {
  isOpen: boolean
  title: string
  description: string
  confirmLabel?: string
  isPending?: boolean
  onConfirm: () => void
  onClose: () => void
}

export const ConfirmationModal = ({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  isPending = false,
  onConfirm,
  onClose,
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      icon={<TriangleAlert size={22} />}
      onClose={() => {
        if (!isPending) onClose()
      }}
      closeOnBackdrop={false}
      size="sm"
    >
      <p className="text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className={cn(
            "rounded-lg border border-slate-200 px-4 py-2.5",
            "text-sm font-medium text-slate-700",
            "transition hover:bg-slate-100",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className={cn(
            "rounded-lg bg-red-600 px-4 py-2.5",
            "text-sm font-medium text-white",
            "transition hover:bg-red-700",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {isPending ? "Processing..." : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}