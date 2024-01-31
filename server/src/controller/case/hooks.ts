import { Op, where } from 'sequelize'
import type { Request, Response } from 'express'
import { Case } from '@/model/case'
import { getPagingParams, getLikeParams } from '@/utils/function'
import { createLogs } from '../log/hooks'

/**
 * 案例列表
 */
export const getCase = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, name } = getPagingParams(req.query)
  const where = getLikeParams({ name })
  const { count, rows } = await Case.findAndCountAll({
    order: [['id', 'DESC']],
    where,
    offset,
    limit
  })
  res.paging({ pageSize, current, total: count, items: rows })
}

/**
 * 案例详情
 */
export const getCaseDetail = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Case.findByPk(id)
  if (!data) return res.status(422).error('案例不存在')
  res.success(data)
}

/**
 * 新增案例
 */
export const createCase = async (req: Request, res: Response) => {
  const { name, desc, pageUrl, coverUrl } = req.body
  if (!name) {
    res.status(422).error('案例标题必传')
  } else if (!desc) {
    res.status(422).error('案例描述必传')
  } else if (!pageUrl) {
    res.status(422).error('页面路径必传')
  } else if (!coverUrl) {
    res.status(422).error('封面图必传')
  } else {
    const data = await Case.create({ name, desc, pageUrl, coverUrl })
    res.success(data)
    createLogs(req, { pageKey: '/case/more', content: `创建案例：${data.get('name')}` })
  }
}

/**
 * 编辑案例
 */
export const updateCase = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { name, desc, pageUrl, coverUrl }
  } = req
  const data = await Case.findByPk(id)
  if (!data) return res.status(422).error('案例不存在')
  const updateInfo = await data.update({ name, desc, pageUrl, coverUrl })
  res.success(updateInfo)
  createLogs(req, { pageKey: '/case/more', content: `修改案例：${data.get('name')}` })
}

/**
 * 删除案例
 */
export const deleteCase = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Case.findByPk(id)
  if (!data) return res.status(422).error('案例不存在')
  await data.destroy()
  res.success()
  createLogs(req, { pageKey: '/case/more', content: `删除案例：${data.get('name')}` })
}
