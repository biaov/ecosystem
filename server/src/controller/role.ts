import { Op } from 'sequelize'
import type { Request, Response } from 'express'
import { Role } from '@/model/role'
import { phoneNumberReg } from '@/utils/regexp'
import { limit, offset } from '@/config/paging'
import { getPagingParams, getLikeParams } from '@/utils/function'
import { createLogs } from './log'

/**
 * 角色列表
 */
export const getRoles = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, all, name } = getPagingParams(req.query)
  if (all) {
    const items = await Role.findAll()
    res.success(items)
  } else {
    const { count, rows } = await Role.findAndCountAll({
      order: [['id', 'DESC']],
      where: getLikeParams({ name }),
      offset,
      limit
    })
    res.paging({ pageSize, current, total: count, items: rows })
  }
}

/**
 * 角色详情
 */
export const getRolesDetail = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Role.findByPk(id)
  if (!data) return res.status(422).error('角色不存在')
  res.success(data)
}

/**
 * 创建角色
 */
export const createRole = async (req: Request, res: Response) => {
  const {
    params: { userId },
    body: { name, code, permissions }
  } = req
  if (!name) {
    res.status(422).error('角色名称不能为空')
  } else if (!code) {
    res.status(422).error('角色编码不能为空')
  } else if (!(permissions && Array.isArray(permissions) && permissions.length)) {
    res.status(422).error('角色权限必填')
  } else {
    const data = await Role.create({ name, code, permissions })
    res.success(data)
    createLogs({ userId, pageKey: '/setting/role', content: `创建角色：${data.get('name')}}` })
  }
}

/**
 * 修改角色信息
 */
export const updateRole = async (req: Request, res: Response) => {
  const {
    params: { id, userId },
    body: { name, permissions }
  } = req
  const data = await Role.findByPk(id)
  if (!data) return res.status(422).error('角色不存在')
  const roleInfo = await data.update({ name, permissions })
  res.success(roleInfo)
  createLogs({ userId, pageKey: '/setting/role', content: `修改角色信息：${data.get('name')}}` })
}

/**
 * 删除角色
 */
export const deleteRole = async (req: Request, res: Response) => {
  const { id, userId } = req.params
  const data = await Role.findByPk(id)
  if (!data) return res.status(422).error('角色不存在')
  await data.destroy()
  res.success()
  createLogs({ userId, pageKey: '/setting/role', content: `删除角色：${data.get('name')}}` })
}
