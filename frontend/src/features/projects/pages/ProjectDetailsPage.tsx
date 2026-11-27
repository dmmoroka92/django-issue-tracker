import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Clock,
  Folder,
  UserRound,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { ProjectErrorState } from "../components/ProjectErrorState"
import { APP_ROUTES } from "../../../app/routes"
import { cn } from "../../../shared/lib/utils"
import { formatDate } from "../../../shared/utils/formatDate"
import { useProject } from "../hooks/useProject"

export const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: project,
    isPending,
    isError,
    refetch,
  } = useProject(id)

  if (!id) {
    return <p>Invalid project ID.</p>
  }

  if (isPending) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-5 w-32 rounded bg-slate-200" />
        <div className="h-14 w-72 rounded bg-slate-200" />
        <div className="h-64 rounded-xl bg-slate-200" />
        <div className="h-48 rounded-xl bg-slate-200" />
      </div>
    )
  }

  if (isError || !project) {
    return <ProjectErrorState refetch={refetch} />
  }

  const isArchived = project.status === "archived"

  const authorName = [
    project.createdBy.firstName,
    project.createdBy.lastName,
  ].join(" ")

  const projectDetails = [
    {
      label: "Created by",
      value: authorName,
      icon: UserRound,
    },
    {
      label: "Created at",
      value: formatDate(project.createdAt),
      icon: CalendarDays,
    },
    {
      label: "Last updated",
      value: formatDate(project.updatedAt),
      icon: Clock,
    },
    {
      label: "Archived at",
      value: project.archivedAt
        ? formatDate(project.archivedAt)
        : "—",
      icon: CalendarDays,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link
        to={APP_ROUTES.PROJECTS}
        className={cn(
          "inline-flex items-center gap-2",
          "text-sm font-medium text-slate-500",
          "transition hover:text-blue-600"
        )}
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      {/* Project header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center",
              "justify-center rounded-xl",
              "bg-blue-50 text-blue-600"
            )}
          >
            <Folder size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {project.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Project #{project.id}
            </p>
          </div>
        </div>

        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            isArchived
              ? "bg-slate-100 text-slate-600"
              : "bg-green-50 text-green-700"
          )}
        >
          {isArchived ? "Archived" : "Active"}
        </span>
      </div>

      {/* Project overview */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Project overview
        </h2>

        <p
          className={cn(
            "mt-3 whitespace-pre-wrap break-words",
            "text-sm leading-relaxed text-slate-600"
          )}
        >
          {project.description}
        </p>

        <div
          className={cn(
            "mt-6 grid grid-cols-1 gap-6",
            "border-t border-slate-100 pt-6",
            "sm:grid-cols-2"
          )}
        >
          {projectDetails.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <p className="text-xs font-medium text-slate-500">
                {label}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <Icon size={16} className="text-slate-400" />

                <span className="text-sm font-medium text-slate-700">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Issues section */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Issues
          </h2>
        </div>

        <div className="flex flex-col items-center px-6 py-12">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center",
              "rounded-xl bg-slate-100 text-slate-400"
            )}
          >
            <ClipboardList size={28} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            Issues coming soon
          </h3>

          <p className="mt-1 text-center text-sm text-slate-500">
            Track tasks, bugs and improvements for this project.
          </p>
        </div>
      </section>
    </div>
  )
}