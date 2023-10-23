interface Meta {
  total: number
  current: number
  pageSize: number
}

export interface PagingResponse<T = Record<string, any>> {
  meta: Meta
  items: T[]
}
