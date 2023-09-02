export interface Meta {
  total: number
  current: number
  pageSize: number
  hasNext: boolean
}

export interface PagingResponse<T = Record<string, any>> extends Record<string, unknown> {
  meta: Meta
  items: T[]
}
