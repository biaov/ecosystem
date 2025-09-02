export interface FormRule {
  required?: boolean
  message?: string
  allowable?: boolean
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

export namespace USEApiRequestName {
  export type Callback<T> = (data: T) => void
}

export interface SearchTransformForm {
  type: string
  keyword: string
  [key: string]: string
}

export interface RequestOption {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
  body?: Record<string, any>
  query?: Record<string, any>
}
