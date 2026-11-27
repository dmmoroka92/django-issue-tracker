import { Folder, Plus } from "lucide-react"
import { cn } from "../../../shared/lib/utils"

export const ProjectEmptyState = () => {
  return (
    <div className={cn(
      "flex flex-col items-center",
      "rounded-xl border border-dashed border-slate-300",
      "bg-white py-16"
    )}>
      <div className="rounded-xl bg-slate-100 p-4">
        <Folder size={32} className="text-slate-400" />
      </div>

      <h2 className="mt-4 font-semibold text-slate-900">
        No projects yet
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Create your first project to get started.
      </p>

      <button
        onClick={() => console.log("Create project")}
        className={cn(
          "mt-5 flex items-center gap-2 rounded-lg bg-blue-600",
          "px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        )}
      >
        <Plus size={16} />
        Create project
      </button>
    </div>
  )
}