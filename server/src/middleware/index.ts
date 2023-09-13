import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { UserInfo } from '@/model/user'
import { Role } from '@/model/role'
import type { PagingResponse } from './types'

/**
 * res.json 重写中间件
 */
export const jsonResponse = (req: Request, res: Response, next: NextFunction) => {
  res.paging = ({ pageSize, current, total, items }: PagingResponse) => {
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

  res.success = (data?: Record<string, unknown>) => res.json(data || { data: true })

  res.error = (message: string) => res.json({ message })

  next()
}

/**
 * 接收 post 参数中间件
 */
export const jsonBodyParser = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['content-type']?.includes('multipart/form-data;')) {
    next()
  } else {
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
}

/**
 * 校验 token
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.slice(7)
  if (token) {
    try {
      const { userId } = verify(token, 'secret') as JwtPayload
      req.params.userId = userId
      next()
    } catch {
      return res.status(401).error('token错误')
    }
  } else {
    return res.status(401).error('token不存在')
  }
}

/**
 * 校验权限
 */
export const verifyPermission = (value: string | string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params
  const userInfo = await UserInfo.findByPk(userId)
  if (!userInfo) return res.status(422).error('用户不存在')
  const roleInfo = await Role.findOne({ where: { code: userInfo!.get('roleCode') } })
  if (roleInfo) {
    const permissions = roleInfo.get('permissions') as string[]
    if (permissions.includes('*')) {
      next()
    } else {
      const permission = Array.isArray(value) ? [...value] : [value]
      if (permission.some(permis => permissions.includes(permis))) {
        next()
      } else {
        return res.status(403).error('权限不足')
      }
    }
  } else {
    return res.status(422).error('角色不存在')
  }
}
