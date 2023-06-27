import { Request, Response } from 'express'
import md5 from 'md5'
import { User } from '@/model/user'
import { phoneNumber } from '@/utils/regexp'
import { limit, offset } from '@/config/paging'

/**
 * 用户列表
 */
export const userList = async (req: Request, res: Response) => {
  const { params } = req
  console.log(req.query)
  const pageSize = +params.pageSize || limit
  const current = +params.current || 1
  const { count, rows } = await User.findAndCountAll({
    order: [['id', 'DESC']],
    offset: offset(current),
    limit: pageSize
  })

  res.list({ pageSize, current, total: count, items: rows })
}

/**
 * 用户详情
 */
export const userDetail = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    res.status(500).error('服务器错误')
  } else {
    const data = await User.findOne({
      where: {
        id
      }
    })
    res.success(data)
  }
}

/**
 * 用户登录
 */
export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username) {
    res.status(422).error('用户名为必传')
  } else if (!phoneNumber.test(username)) {
    res.status(422).error('用户名格式错误，请输入正确的手机号')
  } else if (!password) {
    res.status(422).error('密码为必传')
  } else {
    const data = await User.findOne({
      where: {
        username,
        password: md5(password)
      }
    })
    if (data) {
      res.success(data)
    } else {
      res.status(422).error('用户名或密码错误')
    }
  }
}
