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

export namespace USEApiRequestName {
  export type Callback<T> = (data: T) => void
}
