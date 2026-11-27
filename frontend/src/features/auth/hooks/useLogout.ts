import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "../../../shared/api/client";
import { AUTH_ENDPOINTS } from "../api/endpoints";
import { getApiErrorMessage } from "../../../shared/api/errors";
import { useNavigate } from "react-router";
import { useAppStore } from "../../../app/store";
import { APP_ROUTES } from "../../../app/routes";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const clearAuth = useAppStore(
    (state) => state.auth.clearAuth
  );

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(
        AUTH_ENDPOINTS.AUTH.LOGOUT,
      );

      return response.data;
    },

    onSuccess: async () => {
      clearAuth();

      await queryClient.cancelQueries()
      queryClient.clear()

      toast.success("Logged out successfully")

      navigate(APP_ROUTES.AUTH.LOGIN, { replace: true })
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Logout failed"),
      );
    },
  });
};