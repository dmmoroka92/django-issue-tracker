import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../../../shared/api/client"
import type { ApiResponse } from "../../../shared/api/types"
import type { Project } from "../types"
import { PROJECT_ENDPOINT } from "../api/endpoints"
import { toast } from "sonner"
import { getApiErrorMessage } from "../../../shared/api/errors"

export const useProjectRestore = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (projectId: string) => {
      const response = await apiClient.post<ApiResponse<Project>>(
        PROJECT_ENDPOINT.RESTORE(projectId),
        {}
      )

      return response.data
    },

    onSuccess: (response) => {
      toast.success(
        response.message || "Project restored successfully"
      )

      return queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Failed to restore project")
      )
    },
  })
}