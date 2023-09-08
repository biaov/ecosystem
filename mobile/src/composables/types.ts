import type { Meta, PagingResponse } from '@/api/types'
/**
 * 规则选项
 */
export interface RuleItem {
  required?: boolean
  message?: string
  validator?: (rule: RuleItem, value: unknown) => Promise<string | undefined>
}

/**
 * useSilentAuth 参数
 */
export interface UseSilentAuthParam {
  force: boolean
}

/**
 * usePagingRequest 参数
 */
export namespace UsePagingRequestParam {
  export type Params = Pick<Meta, 'current' | 'pageSize'>

  export type Pagation = Omit<Meta, 'total'>

  export type Request = <T>(params: Params) => Promise<PagingResponse<T>>

  export type Transform = <T>(data: T) => T
}

/**
 * useDetailRequest 参数
 */
export namespace UseDetailRequest {
  export type Request = <T>() => Promise<T>

  export type Transform = <T>(data: T) => T
}
