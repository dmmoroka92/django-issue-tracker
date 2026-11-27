import type { User } from "../auth/types/auth.types"
import type { ProjectPayload } from "./schemas/project.schema"

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

export type ProjectAction =
  | "archive"
  | "restore"
  | "edit"
  | "delete"
  
export type ProjectActionHandler = () => void

export type ProjectUpdatePayload = {
  projectId: string
  formData: ProjectPayload
}