import { useForm } from "react-hook-form"
import { projectSchema, type ProjectPayload } from "../schemas/project.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../../shared/lib/utils"
import { useProjectCreate } from "../hooks/useProjectCreate"
import type { Project } from "../types"
import { useProjectUpdate } from "../hooks/useProjectUpdate"

type ProjectFormProps = {
  project?: Project | null
  onClose: () => void
}

export const ProjectForm = ({ project, onClose }: ProjectFormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectPayload>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? ""
    }
  })

  const { 
    mutate: createProject,
    isPending: isCreating,
  } = useProjectCreate()
  
  const {
    mutate: updateProject,
    isPending: isUpdating
  } = useProjectUpdate()

  const isPending = isCreating || isUpdating

  const onSubmit = (formData: ProjectPayload) => {
    const onSuccess = () => {
      reset()
      onClose()
    }
  
    if (project) {
      updateProject(
        { projectId: project.id, formData },
        { onSuccess }
      )
    } else {
      createProject(formData, { onSuccess })
    }
  }
  
  const inputClass = cn(
    "w-full rounded-lg border border-slate-200",
    "bg-white px-3 py-2.5",
    "text-sm text-slate-900 placeholder:text-slate-400",
    "outline-none transition",
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  )
  
  const labelClass = "text-sm font-medium text-slate-700"
  
  return (
    <form
      id="project-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <div className="space-y-2">
        <label htmlFor="name" className={labelClass}>
          Project name
          <span className="ml-1 text-red-500">*</span>
        </label>
  
        <input
          id="name"
          type="text"
          placeholder="e.g. Issue Tracker"
          className={cn(
            inputClass,
            errors.name && "border-red-500"
          )}
          {...register("name")}
        />
  
        {errors.name && (
          <p className="text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
  
      <div className="space-y-2">
        <label htmlFor="description" className={labelClass}>
          Description
          <span className="ml-1 text-red-500">*</span>
        </label>
  
        <textarea
          id="description"
          rows={5}
          placeholder="Describe the purpose and goals of this project..."
          className={cn(
            inputClass,
            "resize-y min-h-28",
            errors.description && "border-red-500"
          )}
          {...register("description")}
        />
  
        {errors.description ? (
          <p className="text-xs text-red-500">
            {errors.description.message}
          </p>
        ) : (
          <p className="text-xs text-slate-400">
            Provide a brief description of the project.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm",
          "font-medium text-white transition hover:bg-indigo-700",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {isPending
          ? project
            ? "Updating project..."
            : "Creating project..."
          : project
            ? "Save changes"
            : "Create project"}
      </button>
    </form>
  )
}