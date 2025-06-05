interface ResponseError {
  data?: {
    message?: string
  }
}

interface Page {
  current: number
  pageSize: number
}

interface PageDataType<T = Record<string, unknown>> {
  items: T[]
  total: number
}
