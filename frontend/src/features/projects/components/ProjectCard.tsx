import { useState } from "react"
import { ChevronRight, Folder } from "lucide-react"

import type { Project, ProjectAction, ProjectActionHandler } from "../types"
import { ProjectActions } from "./ProjectActions"
import { formatDate } from "../../../shared/utils/formatDate"
import { cn } from "../../../shared/lib/utils"
import { useProjectArchive } from "../hooks/useProjectArchivate"
import { useProjectRestore } from "../hooks/useProjectRestore"

type ProjectCardProps = {
  project: Project,
  onEdit: (project: Project) => void
}

export const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {
  const isArchived = project.status === "archived"

  const authorName =
    `${project.createdBy.firstName} ${project.createdBy.lastName}`

  const initials =
    `${project.createdBy.firstName[0]}${project.createdBy.lastName[0]}`.toUpperCase()

  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const { mutate: archiveProject } = useProjectArchive()
  const { mutate: restoreProject } = useProjectRestore()
  
  const actionHandlers: Record<ProjectAction, ProjectActionHandler> = {
    archive: () => archiveProject(project.id),
    restore: () => restoreProject(project.id),
    edit: () => onEdit(project)
  }
  
  const handleAction = (action: ProjectAction) => {
    setOpenMenuId(null)
  
    actionHandlers[action]()
  }

  return (
    <article
      key={project.id}
      className={cn(
        "rounded-xl border border-slate-200",
        "bg-white p-5",
        "transition hover:border-slate-300 hover:shadow-sm"
      )}
    >
      {/* Card header */}
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0",
            "items-center justify-center rounded-xl",
            isArchived
              ? "bg-slate-100 text-slate-500"
              : "bg-blue-50 text-blue-600"
          )}
        >
          <Folder size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-base font-semibold text-slate-900">
              {project.name}
            </h2>

            <span
              className={cn(
                "inline-flex items-center gap-1.5",
                "rounded-full px-2.5 py-1",
                "text-xs font-medium",
                isArchived
                  ? "bg-slate-100 text-slate-600"
                  : "bg-emerald-50 text-emerald-700"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isArchived
                    ? "bg-slate-400"
                    : "bg-emerald-500"
                )}
              />

              {isArchived ? "Archived" : "Active"}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Project #{project.id}
          </p>
        </div>

        <ProjectActions
          project={project}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          handleAction={handleAction}
        />
      </div>

      {/* Description */}
      <p
        className={cn(
          "mt-4 line-clamp-2",
          "text-sm leading-relaxed text-slate-600"
        )}
      >
        {project.description}
      </p>

      {/* Card footer */}
      <div
        className={cn(
          "mt-5 flex flex-wrap items-center",
          "gap-x-10 gap-y-4",
          "border-t border-slate-100 pt-4"
        )}
      >
        {/* Author */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center",
              "rounded-full bg-blue-100",
              "text-xs font-semibold text-blue-700"
            )}
          >
            {initials}
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Created by
            </p>

            <p className="text-sm font-medium text-slate-700">
              {authorName}
            </p>
          </div>
        </div>

        {/* Created at */}
        <div>
          <p className="text-xs text-slate-400">
            Created
          </p>

          <p className="text-sm text-slate-700">
            {formatDate(project.createdAt)}
          </p>
        </div>

        {/* Updated at */}
        <div>
          <p className="text-xs text-slate-400">
            Last updated
          </p>

          <p className="text-sm text-slate-700">
            {formatDate(project.updatedAt)}
          </p>
        </div>

        {/* Archived at */}
        {project.archivedAt && (
          <div>
            <p className="text-xs text-slate-400">
              Archived
            </p>

            <p className="text-sm text-slate-700">
              {formatDate(project.archivedAt)}
            </p>
          </div>
        )}

        <button
          aria-label={`View ${project.name}`}
          onClick={() => handleAction("View", project.id)}
          className={cn(
            "ml-auto rounded-lg p-2",
            "text-slate-400",
            "hover:bg-slate-100 hover:text-blue-600"
          )}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </article>
  )
}