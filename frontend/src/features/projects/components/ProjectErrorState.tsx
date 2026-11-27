import { AlertCircle, RefreshCw } from "lucide-react"

import type { UseQueryResult } from "@tanstack/react-query";
import type { ProjectsResponse } from "../types";
import { cn } from "../../../shared/lib/utils";

type ProjectErrorStateProps = {
  refetch: UseQueryResult<ProjectsResponse, Error>["refetch"];
}

export const ProjectErrorState = ({ refetch }: ProjectErrorStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center rounded-xl border",
      "border-slate-200 bg-white px-6 py-16 text-center"
    )}>
      <div className="rounded-full bg-red-50 p-4">
        <AlertCircle className="text-red-500" size={28} />
      </div>

      <h2 className="mt-4 font-semibold text-slate-900">
        Unable to load projects
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Something went wrong. Please try again.
      </p>

      <button
        onClick={() => refetch()}
        className={cn(
          "mt-5 flex items-center gap-2 rounded-lg border", 
          "border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50")}
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  )
}