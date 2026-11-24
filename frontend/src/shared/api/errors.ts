import axios from "axios";
import type { ApiErrorResponse } from "./types";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  const status = error.response?.status;

  if (!status || status >= 500) {
    return fallback;
  }

  return error.response?.data?.message || fallback;
}