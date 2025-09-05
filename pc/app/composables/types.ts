export interface FormRule {
  required?: boolean
  message?: string
  allowable?: boolean
  validator?: (value: unknown) => Promise<void>
}

export interface PagingResponse<T = Record<string, any>> {
  total: number
  current: number
  pageSize: number
  hasMore: boolean
  items: T[]
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
