import { Request, Response, NextFunction } from 'express'
import { PagingResponse } from './types'

/**
 * res.json 重写中间件
 */
export const jsonResponse = (req: Request, res: Response, next: NextFunction) => {
  res.list = ({ pageSize, current, total, items }: PagingResponse) => {
    const hasNext = total > current * pageSize
    const responseData = {
      items,
      meta: {
        total,
        current,
        pageSize,
        hasNext
      }
    }

    return res.json(responseData)
  }

  res.success = (data: Record<string, unknown>) => res.json(data)

  res.error = (message: string) => res.json({ message })

  next()
}

/**
 * 接收 post 参数中间件
 */
export const jsonBodyParser = (req: Request, res: Response, next: NextFunction) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    body === '' && (body = '{}')
    try {
      req.body = JSON.parse(body)
      next()
    } catch ({ message }: any) {
      return res.status(400).error(message as string)
    }
  })
}
