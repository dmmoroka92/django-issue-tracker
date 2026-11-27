import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "../../../shared/api/errors"
import type { ProjectPayload } from "../schemas/project.schema"
import { apiClient } from "../../../shared/api/client"
import type { ApiResponse } from "../../../shared/api/types"
import type { Project } from "../types"
import { PROJECT_ENDPOINT } from "../api/endpoints"

export const useProjectCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: ProjectPayload) => {
      const response = await apiClient.post<ApiResponse<Project>>(
        PROJECT_ENDPOINT.CREATE,
        payload
      )

      return response.data
    },

    onSuccess: (response) => {
      toast.success(response.message || "Project created successfully")

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Failed to create project")
      )
    },
  })
}