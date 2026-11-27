import { useForm } from "react-hook-form"
import { projectSchema, type ProjectPayload } from "../schemas/project.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../../shared/lib/utils"
import { useProjectCreate } from "../hooks/useProjectCreate"

type ProjectFormProps = {
  onClose: () => void
}

export const ProjectForm = ({ onClose }: ProjectFormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProjectPayload>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const { mutate: createProject } = useProjectCreate()

  const onSubmit = (formData: ProjectPayload) => {
    createProject(formData, {
      onSuccess: () => {
        reset()
        onClose()
      },
    })
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
        disabled={isSubmitting}
        className={cn(
          "mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm",
          "font-medium text-white transition hover:bg-indigo-700",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {isSubmitting ? "Creating project..." : "Create project"}
      </button>
    </form>
  )
}