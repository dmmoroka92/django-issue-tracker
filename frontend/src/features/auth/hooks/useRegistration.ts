import { useMutation } from "@tanstack/react-query"
import type { SignUpPayload } from "../schemas/signUp.schema"
import type { SignUpResponse } from "../types/auth.types"
import { AUTH_ENDPOINTS } from "../api/endpoints"
import { apiClient } from "../../../shared/api/client"

export const useRegistration = () => {
  return useMutation({
    mutationFn: async (payload: SignUpPayload): Promise<SignUpResponse> => {
      const response = await apiClient.post<SignUpResponse>(
        AUTH_ENDPOINTS.AUTH.SIGN_UP,
        payload
      )

      return response.data
    },
  })
}