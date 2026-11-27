import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../shared/api/client"
import type { ApiResponse } from "../../../shared/api/types"
import type { Project } from "../types"
import { PROJECT_ENDPOINT } from "../api/endpoints"

export const useProject = (projectId: string | undefined) => {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required")
      }

      const response = await apiClient.get<ApiResponse<Project>>(
        PROJECT_ENDPOINT.DETAIL(projectId)
      )

      return response.data.data
    },
    enabled: Boolean(projectId),
  })
}