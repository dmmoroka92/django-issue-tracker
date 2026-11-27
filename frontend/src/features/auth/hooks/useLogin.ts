import { useMutation } from "@tanstack/react-query"
import type { LoginPayload } from "../schemas/login.schema"
import { apiClient } from "../../../shared/api/client"
import type { LoginResponse } from "../types/auth.types"
import { AUTH_ENDPOINTS } from "../api/endpoints"

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await apiClient.post<LoginResponse>(
        AUTH_ENDPOINTS.AUTH.LOGIN,
        payload
      )

      return response.data
    }
  })
}