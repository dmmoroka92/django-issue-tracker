import { useQuery } from "@tanstack/react-query"
import type { ApiResponse } from "../../../shared/api/types"
import type { ProjectsResponse } from "../types"
import { apiClient } from "../../../shared/api/client"
import { PROJECT_ENDPOINT } from "../api/endpoints"

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ProjectsResponse> => {
      const response = await apiClient.get<ApiResponse<ProjectsResponse>>(
        PROJECT_ENDPOINT.LIST
      );

      return response.data.data;
    },
  });
};