export type ApiResponse<T> = {
  message: string
  data: T
}

export type ApiErrorResponse = {
  message?: string
  errors?: Record<string, string[]>
}

export type PaginationMeta = {
  currentPage: number
  pageSize: number
  totalPages: number
  nextPage: number | null
  previousPage: number | null
}