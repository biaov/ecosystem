import { Op } from 'sequelize'
import { limit, offset } from '@/config/paging'

/**
 * 随机字母
 * @example
 * ```js
 * import { randomLetter } from '@/utils/function'
 *
 * randomLetter() // 'jxqjy'
 * ```
 */
export const randomLetter = (length = 5) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    const num = Math.random() * (122 + 1 - 97) + 97
    code += String.fromCharCode(num)
  }

  return code
}

/**
 * 分页参数
 */
export const getPagingParams = (query: Record<string, any>): Record<string, any> => {
  const pageSize = +(query?.pageSize as string) || limit
  const current = +(query?.current as string) || 1

  return { ...query, current, pageSize, offset: offset(current), limit: pageSize }
}

/**
 * 模糊查询参数
 */
export const getLikeParams = (query: Record<string, any> = {}) => {
  const where: Record<string, any> = {}

  Object.entries(query).forEach(([key, value]) => {
    value && (where[key] = { [Op.like]: `%${value}%` })
  })

  return where
}
