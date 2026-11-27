import type { User } from "../auth/types/auth.types"

type ProjectStatus = "active" | "archived"

export type Project = {
  id: string
  name: string
  description: string
  status: ProjectStatus
  createdBy: User
  createdAt: string
  updatedAt: string
  archivedAt: string | null
}

export type ProjectsResponse = {
  projects: Project[]
  activeTotal: number
  archivedTotal: number
  total: number
}
