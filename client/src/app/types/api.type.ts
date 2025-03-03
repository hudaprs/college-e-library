export type ApiResponse<T> = {
  message: string
  results: T
}

export type ApiResponsePaginated<T> = {
  message: string
  results: {
    data: T[]
    count: number
    totalPages: number
  }
}

export type ApiErrorMessage = {
  message: string
  field?: string
}

export type ApiError = {
  message: string
  errors: ApiErrorMessage[]
}
