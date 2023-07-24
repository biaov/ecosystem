import { Response } from 'express'
import { PagingResponse } from '@/middleware/types'

declare global {
  namespace Express {
    interface Response {
      success(data?: unknown): this
      error(data: string): this
      paging(data: PagingResponse): this
    }
  }
}
