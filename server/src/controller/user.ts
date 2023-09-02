import type { Request, Response } from 'express'
import md5 from 'md5'
import { sign } from 'jsonwebtoken'
import type { WhereOptions } from 'sequelize'
import { User, UserInfo } from '@/model/user'
import { Role } from '@/model/role'
import { phoneNumberReg } from '@/utils/regexp'
import { defaultUserConfig, defaultPassword } from '@/config/user'
import { getPagingParams, getLikeParams } from '@/utils/function'
import { createLogs } from './log'

/**
 * 用户列表
 */
export const getUsers = async (req: Request, res: Response) => {
  const { limit, offset, pageSize, current, phoneNumber, nickname, roleCode } = getPagingParams(req.query)
  const where: WhereOptions = getLikeParams({ nickname })
  roleCode && (where.roleCode = roleCode)
  const { count, rows } = await UserInfo.findAndCountAll({
    order: [['id', 'DESC']],
    where,
    offset,
    limit,
    include: {
      model: User,
      where: getLikeParams({ phoneNumber })
    }
  })
  rows.forEach(item => {
    item.setDataValue('phoneNumber', item.getDataValue('User').phoneNumber)
    item.setDataValue('User', undefined)
  })
  res.paging({ pageSize, current, total: count, items: rows })
}

/**
 * 用户详情
 */
export const getUserDetail = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await UserInfo.findByPk(id, { include: User })
  if (!data) return res.status(422).error('用户不存在')
  data.setDataValue('phoneNumber', data.getDataValue('User').phoneNumber)
  data.setDataValue('User', undefined)
  res.success(data)
}

/**
 * 删除用户
 */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await UserInfo.findByPk(id, { include: User })
  if (!data) return res.status(422).error('用户不存在')
  await Promise.all([data.destroy(), User.destroy({ where: { id: data.getDataValue('User').id } })])
  res.success()
  createLogs(req, { pageKey: '/setting/account', content: `删除用户：${data.get('nickname')}` })
}

/**
 * 重置用户密码
 */
export const resetUserPwd = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await UserInfo.findOne({ where: { id }, include: User })
  if (!data) return res.status(422).error('用户不存在')
  await User.update({ password: defaultPassword }, { where: { id: data.getDataValue('User').id } })
  res.success()
  createLogs(req, { pageKey: '/setting/account', content: `重置用户密码：${data.get('nickname')}` })
}

/**
 * 创建用户
 */
export const createUser = async (req: Request, res: Response) => {
  const { roleCode, nickname, phoneNumber } = req.body

  if (!roleCode) {
    res.status(422).error('角色为必传')
  } else if (!nickname) {
    res.status(422).error('昵称为必传')
  } else if (!phoneNumberReg.test(phoneNumber)) {
    res.status(422).error('手机号格式错误')
  } else {
    const [data, created] = await User.findOrCreate({
      defaults: { phoneNumber, password: defaultPassword },
      where: { phoneNumber }
    })
    if (!created) return res.status(422).error('用户已存在')
    const userInfo = await UserInfo.create(defaultUserConfig({ nickname, roleCode, userId: data.get('id') }))
    userInfo.setDataValue('phoneNumber', phoneNumber)
    res.success(userInfo)
    createLogs(req, { pageKey: '/setting/account', content: `创建用户：${userInfo.get('nickname')}` })
  }
}

/**
 * 修改用户信息
 */
export const updateUserDetail = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { avatar, nickname, gender, email, signature, roleCode }
  } = req

  const form: Record<string, unknown> = {}
  avatar && (form.avatar = avatar)
  nickname && (form.nickname = nickname)
  ![undefined, null].includes(gender) && (form.gender = gender)
  email && (form.email = email)
  form.signature = signature ?? ''
  roleCode && (form.roleCode = roleCode)

  const data = await UserInfo.findByPk(id)
  if (!data) return res.status(422).error('用户不存在')
  const [userInfo, authInfo, roleInfo] = await Promise.all([data.update(form, { where: { id } }), User.findByPk(data.getDataValue('userId')), Role.findOne({ where: { code: data.get('roleCode') } })])
  userInfo.setDataValue('permissions', roleInfo!.get('permissions'))
  userInfo.setDataValue('phnoeNumber', authInfo!.get('phoneNumber'))
  res.success(userInfo)
  createLogs(req, { pageKey: '/setting/account', content: `修改用户信息：${userInfo.get('nickname')}` })
}

/**
 * 修改密码
 */
export const editPwd = async (req: Request, res: Response) => {
  const { password, nPassword, cPassword } = req.body
  const { userId } = req.params
  if (!password) {
    res.status(422).error('原密码为必传')
  } else if (!nPassword) {
    res.status(422).error('新密码为必传')
  } else if (!cPassword) {
    res.status(422).error('确认密码为必传')
  } else if (nPassword !== cPassword) {
    res.status(422).error('两次密码不一致')
  } else {
    const data = await UserInfo.findOne({ where: { userId }, include: { model: User, where: { password: md5(password) } } })
    if (data) {
      await User.update({ password: md5(nPassword) }, { where: { id: data.getDataValue('User').id } })
      res.success()
      createLogs(req, { pageKey: '/setting/account', content: `修改密码：${data.get('nickname')}` })
    } else {
      res.status(422).error('原密码错误')
    }
  }
}

/**
 * 用户登录
 */
export const userLogin = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body
  if (!phoneNumber) {
    res.status(422).error('用户名为必传')
  } else if (!phoneNumberReg.test(phoneNumber)) {
    res.status(422).error('用户名格式错误，请输入正确的手机号')
  } else if (!password) {
    res.status(422).error('密码为必传')
  } else {
    const data = await User.findOne({ where: { phoneNumber, password: md5(password) } })
    if (data) {
      const userId = data.get('id') as string
      const userInfo = await UserInfo.findOne({ where: { userId }, include: User })
      userInfo!.setDataValue('phoneNumber', userInfo!.getDataValue('User').phoneNumber)
      userInfo!.setDataValue('User', undefined)
      const token = sign({ userId: userInfo!.get('id') }, 'secret', { expiresIn: '24h' })
      const roleInfo = await Role.findOne({ where: { code: userInfo!.get('roleCode') } })
      userInfo!.setDataValue('permissions', roleInfo?.get('permissions') ?? [])
      res.success({ id: userId, token, userInfo })
      createLogs({ params: { userId } }, { pageKey: '/setting/account', content: '登录系统' })
    } else {
      res.status(422).error('用户名或密码错误')
    }
  }
}

/**
 * 用户注册
 */
export const userRegister = async (req: Request, res: Response) => {
  const { phoneNumber, password, cPassword } = req.body
  if (!phoneNumber) {
    res.status(422).error('用户名为必传')
  } else if (!phoneNumberReg.test(phoneNumber)) {
    res.status(422).error('用户名格式错误，请输入正确的手机号')
  } else if (!password) {
    res.status(422).error('密码为必传')
  } else if (cPassword !== password) {
    res.status(422).error('密码不一致')
  } else {
    const [data, created] = await User.findOrCreate({ defaults: { phoneNumber, password: md5(password) }, where: { phoneNumber } })
    if (!created) return res.status(422).error('用户名已存在')
    const result = await UserInfo.create(defaultUserConfig({ userId: data.get('id') }))
    res.success()
    createLogs({ params: { userId: result.get('id') as string } }, { pageKey: '/setting/account', content: '注册帐号' })
  }
}
