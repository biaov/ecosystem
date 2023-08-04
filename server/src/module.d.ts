import type { Response } from 'express'
import type { PagingResponse } from '@/middleware/types'

declare global {
  namespace Express {
    interface Response {
      success(data?: unknown): this
      error(data: string): this
      paging(data: PagingResponse): this
    }
  }
}
