export const PROJECT_ENDPOINT = {
  LIST: "/projects/",
  CREATE: "/projects/",
  ARCHIVE: (projectId: string) => `/projects/${projectId}/archive`
} as const