/**
 * 分页
 */
export interface PagingResponse {
  items: Record<string, any>[]
  total: number
  current: number
  pageSize: number
}
