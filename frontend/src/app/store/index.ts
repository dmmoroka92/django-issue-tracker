import { create } from "zustand";
import {
  persist,
  devtools,
  createJSONStorage,
} from "zustand/middleware";

import type { AppStore } from "./types";
import { createAuthSlice } from "../../features/auth/store/authSlice";

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
      }),
      {
        name: "issue-tracker-store",

        storage: createJSONStorage(() => localStorage),

        partialize: (state) => ({
          auth: {
            accessToken: state.auth.accessToken,
          },
        }),

        merge: (persistedState, currentState) => {
          const persisted = persistedState as {
            auth?: {
              accessToken: string | null;
            };
          };

          return {
            ...currentState,
            auth: {
              ...currentState.auth,
              ...persisted?.auth,
            },
          };
        },
      },
    ),
    {
      name: "IssueTrackerStore",
      enabled: import.meta.env.DEV,
    },
  ),
);