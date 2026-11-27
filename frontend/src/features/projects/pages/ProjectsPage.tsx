import { FolderPlus, Plus } from "lucide-react";

import { useProjects } from "../hooks/useProjects";
import { ProjectErrorState } from "../components/ProjectErrorState";
import { ProjectListSkeleton } from "../components/ProjectListSkeleton";
import { ProjectEmptyState } from "../components/ProjectEmptyState";
import { ProjectStats } from "../components/ProjectStats";
import { ProjectCard } from "../components/ProjectCard";
import { cn } from "../../../shared/lib/utils";
import { Modal } from "../../../shared/components/Modal";
import { useState } from "react";
import { ProjectForm } from "../components/ProjectForm";

export const ProjectsPage = () => {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useProjects()
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false)

  const projects = data?.projects ?? [];
  const projectsTotal = data?.total ?? 0;
  const activeTotal = data?.activeTotal ?? 0
  const archivedTotal = data?.archivedTotal ?? 0

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and organize your team's projects.
          </p>
        </div>

        <button
          onClick={() => setIsProjectModalOpen(true)}
          className={cn(
            "flex items-center gap-2 rounded-lg bg-blue-600",
            "px-4 py-2.5 text-sm font-medium text-white",
            "transition hover:bg-blue-700"
          )}
        >
          <Plus size={18} />
          New project
        </button>
      </div>

      {isPending && <ProjectListSkeleton />}

      {isError && <ProjectErrorState refetch={refetch} />}

      {!isPending && !isError && projects && (
        <>
          <ProjectStats
            total={projectsTotal}
            activeCount={activeTotal}
            archivedCount={archivedTotal}
          />

          {projects.length === 0 && <ProjectEmptyState />}

          <div className="space-y-4">
            {projects.map((project) => {
              
              return <ProjectCard key={project.id} project={project} />
            })}
          </div>

          {projects.length > 0 && (
            <p className="text-sm text-slate-400">
              Showing {projects.length} projects
            </p>
          )}
        </>
      )}

      <Modal
        isOpen={isProjectModalOpen}
        title="New Project"
        description="Create a project to organize issues, tasks, and team collaboration."
        icon={<FolderPlus size={22} />}
        onClose={() => setIsProjectModalOpen(false)}
        closeOnBackdrop={true}
      >
        <ProjectForm onClose={() => setIsProjectModalOpen(false)}/>
      </Modal>
    </div>
  )
}
