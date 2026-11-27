import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../../../shared/api/client"
import type { ApiResponse } from "../../../shared/api/types"
import { PROJECT_ENDPOINT } from "../api/endpoints"
import { toast } from "sonner"
import { getApiErrorMessage } from "../../../shared/api/errors"

export const useProjectDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (projectId: string) => {
      const response = await apiClient.delete<ApiResponse<void>>(
        PROJECT_ENDPOINT.DELETE(projectId)
      )

      return response.data
    },

    onSuccess: (response) => {
      toast.success(response.message || "Project deleted successfully")

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Failed to delete project")
      )
    },
  })
}