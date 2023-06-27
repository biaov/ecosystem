import { Request, Response } from 'express'
import { ShortChain } from '@/model/short-chain'
import { randomLetter } from '@/utils/function'

/**
 * 列表
 */
export const shortChainList = async (req: Request, res: Response) => {
  const { link, current, pageSize } = req.query
  if (link) {
    const data = await ShortChain.findOne({
      where: {
        link
      }
    })
    res.json(data)
  } else {
    const limit = Number(pageSize) || 10
    const curCurrent = Number(current) || 1
    const offset = (curCurrent - 1) * limit
    const { rows, count } = await ShortChain.findAndCountAll({
      order: [['id', 'DESC']],
      limit,
      offset
    })

    res.list({ pageSize: limit, current: curCurrent, total: count, list: rows })
  }
}

/**
 * 详情
 */
export const shortChainDetail = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    res.status(422).error('id 为必传')
    return
  }
  const data = await ShortChain.findOne({
    where: {
      id
    }
  })

  res.json(data)
}

/**
 * 创建
 */
export const shortChainCreate = async (req: Request, res: Response) => {
  const { content } = req.body
  if (!content) {
    res.status(422).error('content 为必传')
    return
  }
  const link = randomLetter()
  const isExist = await ShortChain.findOne({ where: { link } })
  const data = isExist
    ? await ShortChain.update(
        {
          content
        },
        { where: { link } }
      )
    : await ShortChain.create({
        content,
        link
      })

  res.json(data)
}

/**
 * 删除
 */
export const shortChainDelete = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    res.status(422).error('id 为必传')
    return
  }
  await ShortChain.destroy({
    where: {
      id
    }
  })

  res.json(null)
}
