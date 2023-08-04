import type { Request, Response } from 'express'
import { Log } from '@/model/log'
import { UserInfo } from '@/model/user'
import { getPagingParams, getLikeParams } from '@/utils/function'
import type { CreateLogParam } from './types'

/**
 * 日志列表
 */
export const getLogs = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, nickname, pageKey, content } = getPagingParams(req.query)
  const where = getLikeParams({ nickname, content })
  pageKey && (where.pageKey = pageKey)

  const { count, rows } = await Log.findAndCountAll({
    order: [['id', 'DESC']],
    where,
    offset,
    limit
  })
  res.paging({ pageSize, current, total: count, items: rows })
}

/**
 * 创建日志
 */
export const createLogs = async (req: Request | Pick<Request, 'params'>, { pageKey, content }: CreateLogParam) => {
  const { userId } = req.params
  const data = await UserInfo.findByPk(+userId)
  data && Log.create({ nickname: data.get('nickname'), pageKey, content })
}
