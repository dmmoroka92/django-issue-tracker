
import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import { useAppStore } from "../../app/store";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = useAppStore.getState().auth.accessToken 
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (
      config.data &&
      typeof config.data === "object" &&
      !(config.data instanceof FormData)
    ) {
      config.data = snakecaseKeys(config.data, { deep: true });
    }

    return config;
  },
  (error: unknown): Promise<never> => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.data && typeof response.data === "object") {
      response.data = camelcaseKeys(response.data, { deep: true });
    }

    return response;
  },
  (error: unknown): Promise<never> => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<unknown>;
      const data = axiosError.response?.data;

      if (data && typeof data === "object") {
        axiosError.response!.data = camelcaseKeys(data, {
          deep: true,
        });
      }
    }

    return Promise.reject(error);
  },
);
