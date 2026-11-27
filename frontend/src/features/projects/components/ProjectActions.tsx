import { cn } from "../../../shared/lib/utils";
import type { Project } from "../types"
import {
  Archive,
  ArchiveRestore,
  ExternalLink,
  MoreHorizontal, 
  Pencil,
  Trash2
} from "lucide-react";

type ProjectActionsProps = {
  project: Project
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
  handleAction: (action: string) => void
}

export const ProjectActions = ({
  project,
  openMenuId,
  setOpenMenuId,
  handleAction
}: ProjectActionsProps) => {
  const isArchived = project.status === "archived"

  return (
    <div className="relative">
      <button
        aria-label={`Actions for ${project.name}`}
        aria-expanded={openMenuId === project.id}
        onClick={() =>
          setOpenMenuId(
            openMenuId === project.id
              ? null
              : project.id
          )
        }
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
      >
        <MoreHorizontal size={20} />
      </button>

      {openMenuId === project.id && (
        <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          <button
            onClick={() =>
              handleAction("view")
            }
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <ExternalLink size={16} />
            View project
          </button>

          <button
            onClick={() =>
              handleAction("edit")
            }
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit project
          </button>

          <button
            onClick={() => {
              handleAction(
                isArchived ? "restore" : "archive"
              )
            }
          }
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            {isArchived ? (
              <ArchiveRestore size={16} />
            ) : (
              <Archive size={16} />
            )}

            {isArchived
              ? "Restore project"
              : "Archive project"}
          </button>

          <div className="my-1 border-t border-slate-100" />

          <button
            onClick={() =>
              handleAction("delete")
            }
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2",
              "text-left text-sm text-red-600 hover:bg-red-50"
            )}
          >
            <Trash2 size={16} />
            Delete project
          </button>
        </div>
      )}
    </div>
  )
}