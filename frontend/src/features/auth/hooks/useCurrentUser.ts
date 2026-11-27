import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../shared/api/client"
import type { User } from "../types/auth.types"
import type { ApiResponse } from "../../../shared/api/types"
import { AUTH_ENDPOINTS } from "../api/endpoints"

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>(
        AUTH_ENDPOINTS.AUTH.ME,
      )

      return response.data.data
    }
  })
}