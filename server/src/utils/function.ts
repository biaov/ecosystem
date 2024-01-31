import { Op } from 'sequelize'
import type { Model } from 'sequelize'
import { limit, offset } from '@/config/paging'
import crypto from 'crypto'

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

/**
 * 随机 ID
 */
export const randomId = () => `${+new Date()}${Math.random().toString(36).substring(2)}`

/**
 * 数组格式化-访问器属性
 */
export const defineArrayFormatProperty = <T extends Model>(field: string) => ({
  get() {
    const that = this as T
    const value = that.getDataValue(field)
    return value ? value.split(',') : []
  },
  set(value: string | string[]) {
    const that = this as T
    const newValue = Array.isArray(value) ? value.join(',') : value
    that.setDataValue(field, newValue)
  }
})

/**
 * 随机数
 */
export const random = (min: number, max: number) => {
  const range = max - min + 1
  const byteArray = new Uint8Array(1)

  do {
    crypto.getRandomValues(byteArray)
  } while (byteArray[0] >= 256 - (256 % range))

  return min + (byteArray[0] % range)
}

/**
 * 手机号码加密
 */
export const encryptionPhoneNumber = (phoneNumber: string) => {
  const start = phoneNumber.slice(0, 3)
  const end = phoneNumber.slice(-4)
  return `${start}****${end}`
}
