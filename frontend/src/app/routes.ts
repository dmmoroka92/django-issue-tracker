export const APP_ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  DASHBOARD: "/",
  PROJECTS: "/projects",
  PROJECT_DETAILS: (projectId: string) => `/projects/${projectId}`,
} as const;