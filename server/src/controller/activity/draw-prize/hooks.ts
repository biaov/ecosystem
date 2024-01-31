import type { Request, Response } from 'express'
import { Op } from 'sequelize'
import { ActivityDrawPrize, ActivityDrawPrizeRecord, ActivityDrawPrizeHold } from '@/model/activity/draw-prize'
import { getPagingParams, getLikeParams, random } from '@/utils/function'
import { activityStatus } from '@/enums/activity'
import { createLogs } from '@/controller/log/hooks'
import { RuleItem, UserItem } from './types'

/**
 * 获取状态
 */
const getStatus = (item: ActivityDrawPrize) => activityStatus.format({ startTime: item.get('startTime') as string, endTime: item.get('endTime') as string })

/**
 * 设置状态
 */
const setStatus = (item: ActivityDrawPrize) => {
  item.setDataValue('status', getStatus(item))
}

/**
 * 活动列表
 */
export const getActivity = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, all, name, status } = getPagingParams(req.query)
  const where = { where: { ...getLikeParams({ name }) } }
  activityStatus.filter(status) && Object.assign(where.where, activityStatus.format({ status }) as Record<string, unknown>)
  if (all) {
    const items = await ActivityDrawPrize.findAll(where)
    items.forEach(setStatus)
    res.success(items)
  } else {
    const { count, rows } = await ActivityDrawPrize.findAndCountAll({
      ...where,
      order: [['id', 'DESC']],
      offset,
      limit
    })
    rows.forEach(setStatus)
    res.paging({ pageSize, current, total: count, items: rows })
  }
}

const activityParamsValid = (req: Request, res: Response) => {
  const { name, desc, startTime, endTime, rules, users } = req.body
  if (!name) {
    res.status(422).error('名称必传')
    return false
  } else if (!desc) {
    res.status(422).error('说明必传')
    return false
  } else if (!startTime) {
    res.status(422).error('开始时间必传')
    return false
  } else if (!endTime) {
    res.status(422).error('结束时间必传')
    return false
  } else if (!(rules && rules.length)) {
    res.status(422).error('活动规则必传')
    return false
  } else if (!(users && users.length)) {
    res.status(422).error('参与用户必传')
    return false
  } else {
    return true
  }
}
/**
 * 创建活动
 */
export const createActivity = async (req: Request, res: Response) => {
  const { name, desc, startTime, endTime, rules, users } = req.body
  const data = await ActivityDrawPrize.create({ name, desc, startTime, endTime })
  const activityId = data.get('id')
  const holds = (rules as RuleItem[]).map(item => ({ activityId, name: item.name, prizeName: item.prizeName, stock: item.stock, hold: 0 }))
  const records = (users as UserItem[]).map(({ username, phoneNumber }) => ({ activityId, username, phoneNumber }))
  await Promise.all([ActivityDrawPrizeHold.bulkCreate(holds), ActivityDrawPrizeRecord.bulkCreate(records)])
  res.success(data)
  createLogs(req, { pageKey: '/activity/draw-prize', content: `创建活动：ID - ${activityId}` })
}

/**
 * 编辑活动
 */
export const updateActivity = async (req: Request, res: Response) => {
  if (!activityParamsValid(req, res)) return
  const {
    params: { id },
    body: { name, desc, startTime, endTime }
  } = req
  const data = await ActivityDrawPrize.findByPk(id)
  if (!data) return res.status(422).error('活动不存在')
  const updateInfo = await data.update({ name, desc, startTime, endTime })
  res.success(updateInfo)
  createLogs(req, { pageKey: '/activity/draw-prize', content: `修改活动：ID - ${data.get('id')}` })
}

/**
 * 删除活动
 */
export const deleteActivity = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await ActivityDrawPrize.findByPk(id)
  if (!data) return res.status(422).error('活动不存在')
  await data.destroy()
  res.success()
  createLogs(req, { pageKey: '/activity/draw-prize', content: `删除活动：ID - ${data.get('id')}` })
}

/**
 * 活动详情
 */
export const getActivityDetail = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await ActivityDrawPrize.findByPk(id)
  if (!data) return res.status(422).error('活动不存在')
  setStatus(data)
  const activityId = data.get('id')
  const query = { where: { activityId } }
  const [rules, users] = await Promise.all([ActivityDrawPrizeHold.findAll(query), ActivityDrawPrizeRecord.findAll(query)])
  data.setDataValue('rules', rules)
  data.setDataValue('users', users)
  res.success(data)
}

/**
 * 活动记录列表
 */
export const getActivityRecord = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, all, activityId } = getPagingParams(req.query)
  const where = { where: { activityId } }
  if (all) {
    const items = await ActivityDrawPrizeRecord.findAll(where)
    res.success(items)
  } else {
    const { count, rows } = await ActivityDrawPrizeRecord.findAndCountAll({
      ...where,
      order: [['id', 'DESC']],
      offset,
      limit
    })
    res.paging({ pageSize, current, total: count, items: rows })
  }
}

/**
 * 更新活动记录
 */
export const updateActivityRecord = async (req: Request, res: Response) => {
  const {
    params: { activityId },
    body: { username, phoneNumber, deviceId }
  } = req
  if (!activityId) return res.status(422).error('活动ID必传')
  if (!username) return res.status(422).error('用户名必传')
  if (!phoneNumber) return res.status(422).error('用户名必传')
  if (!deviceId) return res.status(422).error('设备ID必传')
  const data = await ActivityDrawPrizeRecord.findOne({ where: { activityId, username, phoneNumber } })
  if (!data) return res.status(422).error('用户信息未录入，请联系管理员')
  if (data.get('deviceId')) return res.status(422).error('请不要更换浏览器扫码')
  await data.update({ deviceId })
  res.success(true)
}

/**
 * 获取记录详情
 */
export const getActivityRecordDetail = async (req: Request, res: Response) => {
  const {
    params: { activityId },
    query: { deviceId }
  } = req
  if (!activityId) return res.status(422).error('活动ID必传')
  if (!deviceId) return res.status(422).error('设备ID必传')
  const data = await ActivityDrawPrizeRecord.findOne({ where: { activityId, deviceId } })
  if (!data) return res.status(422).error('记录不存在')
  res.success(data)
}

/**
 * 活动抽奖
 */
export const updateActivityDraw = async (req: Request, res: Response) => {
  const { activityId, deviceId } = req.body
  if (!activityId) return res.status(422).error('活动ID必传')
  if (!deviceId) return res.status(422).error('设备ID必传')
  const data = await ActivityDrawPrize.findByPk(activityId)
  if (!data) return res.status(422).error('活动不存在')

  const status = getStatus(data) as string
  if (status !== activityStatus.normal) return res.status(422).error(activityStatus.filter(status).label)
  const [holds, records] = await Promise.all([
    ActivityDrawPrizeHold.findAll({
      where: {
        activityId,
        stock: {
          [Op.gt]: 0
        }
      }
    }),
    ActivityDrawPrizeRecord.findAll({
      where: {
        activityId,
        holdName: {
          [Op.not]: true
        }
      }
    })
  ])
  const record = records.find(item => item.get('deviceId') === deviceId)
  if (!record) return res.status(422).error('请先扫码')
  if (record.get('prizeName')) return res.status(422).error('您已经抽过奖了')
  const totalTotal = holds.reduce((prev, item) => prev + (item.get('stock') as number), 0)
  if (!totalTotal) return res.status(422).error('奖品已经抽完了')
  const index = random(1, totalTotal)
  let selectItem!: ActivityDrawPrizeHold
  let prev = 0
  for (const item of holds) {
    prev += item.get('stock') as number
    if (index <= prev) {
      selectItem = item
      break
    }
  }
  const holdName = selectItem.get('name') as string
  const stock = (selectItem.get('stock') as number) - 1
  const hold = (selectItem.get('hold') as number) + 1
  await Promise.all([ActivityDrawPrizeRecord.update({ holdName }, { where: { activityId, deviceId } }), ActivityDrawPrizeHold.update({ stock, hold }, { where: { activityId, name: holdName } })])
  res.success(holdName)
}

/**
 * 获取活动规则
 */
export const getActivityRules = async (req: Request, res: Response) => {
  const { activityId } = req.query
  if (!activityId) return res.status(422).error('活动ID必传')
  const list = await ActivityDrawPrizeHold.findAll({ where: { activityId } })
  res.success(list)
}
