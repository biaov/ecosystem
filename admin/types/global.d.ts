interface ResponseError {
  data?: {
    message?: string
  }
}

interface ResponseSuccess<T> {
  data: T
}

interface Page {
  current: number
  pageSize: number
}

interface PageDataType<T = Record<string, unknown>> {
  items: T[]
  total: number
  current: number
  pageSize: number
}

interface TableDataType {
  id: number
}
