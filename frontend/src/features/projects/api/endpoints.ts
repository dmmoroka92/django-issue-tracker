export const PROJECT_ENDPOINT = {
  LIST: "/projects/",
  CREATE: "/projects/",
  DETAIL: (projectId: string) => `/projects/${projectId}`,
  UPDATE: (projectId: string) => `/projects/${projectId}/`,
  DELETE: (projectId: string) => `/projects/${projectId}/`,
  ARCHIVE: (projectId: string) => `/projects/${projectId}/archive/`,
  RESTORE: (projectId: string) => `/projects/${projectId}/restore/`
} as const