import { Op } from 'sequelize'
import type { Request, Response } from 'express'
import { Swiper, Notice, Recommend, Feature } from '@/model/manage'
import { getPagingParams, getLikeParams } from '@/utils/function'
import { createLogs } from './log'

/**
 * 轮播列表
 */
export const getSwiper = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current } = getPagingParams(req.query)
  const { count, rows } = await Swiper.findAndCountAll({
    order: [['id', 'DESC']],
    offset,
    limit
  })
  res.paging({ pageSize, current, total: count, items: rows })
}

/**
 * 新增轮播
 */
export const createSwiper = async (req: Request, res: Response) => {
  const { url, pageUrl, isShow } = req.body
  if (!url) {
    res.status(422).error('轮播图片必传')
  } else if (!pageUrl) {
    res.status(422).error('页面地址必传')
  } else {
    const data = await Swiper.create({ url, pageUrl, isShow: !!isShow })
    res.success(data)
    createLogs(req, { pageKey: '/manage/swiper', content: `创建轮播图：ID - ${data.get('id')}}` })
  }
}

/**
 * 编辑轮播
 */
export const updateSwiper = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { url, pageUrl, isShow }
  } = req
  const data = await Swiper.findByPk(id)
  if (!data) return res.status(422).error('轮播图不存在')
  const updateInfo = await data.update({ url, pageUrl, isShow })
  res.success(updateInfo)
  createLogs(req, { pageKey: '/manage/swiper', content: `修改轮播图：ID - ${data.get('id')}}` })
}

/**
 * 删除轮播
 */
export const deleteSwiper = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Swiper.findByPk(id)
  if (!data) return res.status(422).error('轮播图不存在')
  await data.destroy()
  res.success()
  createLogs(req, { pageKey: '/manage/swiper', content: `删除轮播图：ID - ${data.get('id')}}` })
}

/**
 * 公告列表
 */
export const getNotice = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, title } = getPagingParams(req.query)
  const where = getLikeParams({ title })
  const { count, rows } = await Notice.findAndCountAll({
    order: [['id', 'DESC']],
    where,
    offset,
    limit
  })
  res.paging({ pageSize, current, total: count, items: rows })
}

/**
 * 新增公告
 */
export const createNotice = async (req: Request, res: Response) => {
  const { title, isShow, content } = req.body
  if (!title) {
    res.status(422).error('公告标题必传')
  } else if (!content) {
    res.status(422).error('公告内容必传')
  } else {
    const data = await Notice.create({ title, content, isShow: !!isShow })
    res.success(data)
    createLogs(req, { pageKey: '/manage/notice', content: `创建公告：${data.get('title')}}` })
  }
}

/**
 * 编辑公告
 */
export const updateNotice = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { title, isShow, content }
  } = req
  const data = await Notice.findByPk(id)
  if (!data) return res.status(422).error('公告不存在')
  const updateInfo = await data.update({ title, isShow, content })
  res.success(updateInfo)
  createLogs(req, { pageKey: '/manage/notice', content: `修改公告：${data.get('title')}}` })
}

/**
 * 删除公告
 */
export const deleteNotice = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Notice.findByPk(id)
  if (!data) return res.status(422).error('公告不存在')
  await data.destroy()
  res.success()
  createLogs(req, { pageKey: '/manage/notice', content: `删除公告：${data.get('title')}}` })
}

/**
 * 推荐列表
 */
export const getRecommend = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, title } = getPagingParams(req.query)
  const where = getLikeParams({ title })
  const { count, rows } = await Recommend.findAndCountAll({
    order: [['id', 'DESC']],
    where,
    offset,
    limit
  })
  res.paging({ pageSize, current, total: count, items: rows })
}

/**
 * 推荐详情
 */
export const getRecommendDetail = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Recommend.findByPk(id)
  if (!data) return res.status(422).error('文章不存在')
  res.success(data)
}

/**
 * 新增推荐
 */
export const createRecommend = async (req: Request, res: Response) => {
  const { title, coverUrl, content } = req.body
  if (!title) {
    res.status(422).error('文章标题必传')
  } else if (!coverUrl) {
    res.status(422).error('文章封面图必传')
  } else if (!content) {
    res.status(422).error('文章标题内容必传')
  } else {
    const data = await Recommend.create({ title, coverUrl, content })
    res.success(data)
    createLogs(req, { pageKey: '/manage/recommend', content: `创建文章：${data.get('title')}}` })
  }
}

/**
 * 编辑推荐
 */
export const updateRecommend = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { title, coverUrl, content }
  } = req
  const data = await Recommend.findByPk(id)
  if (!data) return res.status(422).error('文章不存在')
  const updateInfo = await data.update({ title, coverUrl, content })
  res.success(updateInfo)
  createLogs(req, { pageKey: '/manage/recommend', content: `修改文章：${data.get('title')}}` })
}

/**
 * 删除推荐
 */
export const deleteRecommend = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Recommend.findByPk(id)
  if (!data) return res.status(422).error('文章不存在')
  await data.destroy()
  res.success()
  createLogs(req, { pageKey: '/manage/recommend', content: `删除文章：${data.get('title')}}` })
}

/**
 * 功能列表
 */
export const getFeature = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, name, platforms } = getPagingParams(req.query)
  const where = getLikeParams({ name })
  platforms && Array.isArray(platforms) && (where.platforms = { [Op.in]: platforms })

  const { count, rows } = await Feature.findAndCountAll({
    order: [['id', 'DESC']],
    where,
    offset,
    limit
  })
  res.paging({ pageSize, current, total: count, items: rows })
}

/**
 * 新增功能
 */
export const createFeature = async (req: Request, res: Response) => {
  const { name, iconName, pageUrl, platforms } = req.body
  if (!name) {
    res.status(422).error('功能名称必传')
  } else if (!iconName) {
    res.status(422).error('功能图标名称必传')
  } else if (!pageUrl) {
    res.status(422).error('功能页面地址必传')
  } else if (!platforms) {
    res.status(422).error('功能平台必传')
  } else if (!(Array.isArray(platforms) && platforms.length)) {
    res.status(422).error('功能平台格式错误')
  } else {
    const data = await Feature.create({ name, iconName, platforms })
    res.success(data)
    createLogs(req, { pageKey: '/manage/feature', content: `创建功能：${data.get('name')}}` })
  }
}

/**
 * 编辑功能
 */
export const updateFeature = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { name, iconName, pageUrl, platforms }
  } = req
  const data = await Feature.findByPk(id)
  if (!data) return res.status(422).error('功能不存在')
  const updateInfo = await data.update({ name, iconName, platforms, pageUrl })
  res.success(updateInfo)
  createLogs(req, { pageKey: '/manage/recommend', content: `修改功能：${data.get('name')}}` })
}

/**
 * 删除功能
 */
export const deleteFeature = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Feature.findByPk(id)
  if (!data) return res.status(422).error('功能不存在')
  await data.destroy()
  res.success()
  createLogs(req, { pageKey: '/manage/feature', content: `删除功能：${data.get('name')}}` })
}
