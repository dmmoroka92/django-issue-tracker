import { useMutation } from "@tanstack/react-query"
import type { SignUpPayload } from "../schemas/signUp.schema"
import type { User } from "../types/auth.types"
import type { ApiResponse } from "../../../shared/api/types"
import { API_ENDPOINTS } from "../api/endpoints"
import { apiClient } from "../../../shared/api/client"

export const useRegistration = () => {
  return useMutation({
    mutationFn: async (payload: SignUpPayload): Promise<ApiResponse<User>> => {
      const response = await apiClient.post<ApiResponse<User>>(
        API_ENDPOINTS.AUTH.SIGN_UP,
        payload
      )

      return response.data
    },
  })
}