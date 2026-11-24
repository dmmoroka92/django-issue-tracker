import { create } from "zustand";
import type { AppStore } from "./types";
import { createAuthSlice } from "../../features/auth/store/authSlice";
import { devtools } from "zustand/middleware";

export const useAppStore = create<AppStore>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
  }),
  {
    name: "IssueTrackerStore",
    enabled: import.meta.env.DEV,
  }
));