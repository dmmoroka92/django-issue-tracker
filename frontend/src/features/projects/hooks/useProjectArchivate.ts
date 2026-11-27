import { useMutation } from "@tanstack/react-query"
import { apiClient } from "../../../shared/api/client"
import type { Project } from "../types"
import type { ApiResponse } from "../../../shared/api/types"
import { PROJECT_ENDPOINT } from "../api/endpoints"

export const useProjectArchivate = (projectId: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<ApiResponse<Project>>(
        PROJECT_ENDPOINT.ARCHIVE(projectId),
        {}
      )

      return response.data
    }
  })
}