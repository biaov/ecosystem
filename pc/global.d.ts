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

interface IdDataType {
  id: number
  createdAt: string
  updatedAt: string
}

interface SearchTransformForm {
  type: string
  keyword: string
  [key: string]: string
}

interface Document {
  caretPositionFromPoint(
    x: number,
    y: number
  ): {
    offsetNode: Node
    offset: number
  }
}

interface Option {
  label: string
  value: string
}
