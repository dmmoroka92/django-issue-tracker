import type { StateCreator } from "zustand";
import type { AppStore } from "../../../app/store/types";

export type AuthSlice = {
  auth: {
    accessToken: string | null
    setAccessToken: (token: string) => void
    clearAuth: () => void
  }
}

export const createAuthSlice: StateCreator<
  AppStore,
  [],
  [],
  AuthSlice
> = (set) => ({
  auth: {
    accessToken: null,

    setAccessToken: (token) =>
      set((state) => ({
        auth: {
          ...state.auth,
          accessToken: token,
        },
      })),

    clearAuth: () =>
      set((state) => ({
        auth: {
          ...state.auth,
          accessToken: null,
        },
      })),
  },
});