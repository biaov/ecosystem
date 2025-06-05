/**
 * 分页
 */
export type Pagination = {
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: string[]
  showTotal: (total: number) => string
  current: number
  pageSize: number
  total: number
}

export interface FormRule {
  required?: boolean
  message?: string
  validator?: (value: unknown) => Promise<void>
}

interface Meta {
  total: number
  current: number
  pageSize: number
}

export interface PagingResponse {
  meta: Meta
  list: Record<string, any>[]
}


