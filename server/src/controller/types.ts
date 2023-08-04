import type { Request } from 'express'

/**
 * CreateLog 参数
 */
export interface CreateLogParam {
  pageKey: string
  content: string
}
