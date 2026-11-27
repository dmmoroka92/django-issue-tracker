import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../../../shared/api/client"
import type { ApiResponse } from "../../../shared/api/types"
import type { Project, ProjectUpdatePayload } from "../types"
import { PROJECT_ENDPOINT } from "../api/endpoints"
import { toast } from "sonner"
import { getApiErrorMessage } from "../../../shared/api/errors"

export const useProjectUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      projectId,
      formData,
    }: ProjectUpdatePayload) => {
      const response = await apiClient.patch<ApiResponse<Project>>(
        PROJECT_ENDPOINT.UPDATE(projectId),
        formData
      )

      return response.data
    },

    onSuccess: (response) => {
      toast.success(
        response.message || "Project updated successfully"
      )

      return queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Failed to update project")
      )
    },
  })
}