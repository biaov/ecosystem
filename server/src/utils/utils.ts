import type { DeleteResult, FindOperator } from 'typeorm'
import * as xlsx from 'xlsx'

/**
 * [min, max) 随机数
 */
export const random = (max: number = 0, min: number = 0): number => ~~(Math.random() * (max - min)) + min

/**
 * 生成随机字符串
 */
export const randomId = (binary = 32) => +new Date() + Math.random().toString(binary).slice(2)

/**
 * 生成 Redis 键
 */
export const getRedisKey = (prefix: string, id: string): string => `${prefix}-${id}`

/**
 * 获取分页器参数
 */
export const getPageQuery = ({ current, pageSize }: { current?: number | string; pageSize?: number | string } = initPage) => {
  const newCurrent = Number(current) || initPage.current
  const take = Number(pageSize) || initPage.pageSize
  const skip = (newCurrent - 1) * take

  return { take, skip, current: newCurrent, pageSize: take }
}

/**
 * 获取分页器参数
 */
export const findAndCount = async (promise: Promise<any>, page: Pick<PageOption, 'current' | 'pageSize'>) => {
  const [items, total] = await promise
  return { items, total, ...page }
}

type USETransfrormQueryOption = boolean | number | string | string[] | FindOperator<string> | undefined | Record<string, any>

/**
 * 转换查询条件
 */
export const useTransfrormQuery = <T = Record<string, USETransfrormQueryOption | Record<string, USETransfrormQueryOption>>>(
  data: Record<string, USETransfrormQueryOption>,
  transform: Record<string, string>
) => {
  // 转换查询条件
  Object.entries(transform).forEach(([key, value]) => {
    if (!data[key]) return
    switch (value) {
      case 'like':
        data[key] = Like(`%${data[key]}%`)
        break
      case 'between': {
        const val = data[key]
        data[key] = Array.isArray(val) && val.length === 2 ? Between(val[0], val[1]) : undefined
        break
      }
      case 'datetime':
        data[key] = dayjs(data[key]).format('YYYY-MM-DD hh:mm:ss')
        break
    }
  })
  // 转换为数组
  const dataEntries = Object.entries(data)
  let result: [{}] | [string, {}] | Record<string, unknown> | [string, USETransfrormQueryOption]
  // 关联表查询
  if (dataEntries[0][0].includes('.')) {
    result = dataEntries.reduce(
      (prev, [key, value]) => {
        const keyArr = key.split('.')
        if (value !== 0 && value) {
          let newValue = value
          let symbol = '='

          if (transform[key] === 'like') {
            newValue = (value as FindOperator<string>).value
            symbol = 'LIKE'
          }

          const prop = keyArr[1]
          prev[0] += `${prev[0] ? ' AND ' : ''}${key} ${symbol} :${prop}`
          prev[1]![prop] = newValue
        }

        return prev
      },
      ['', {}]
    )
    !result[0] && (result = [{}])
  } else {
    // 普通查询
    result = dataEntries.reduce((prev, [key, value]) => {
      value !== 0 && value && (prev[key] = value)
      return prev
    }, {})
  }
  return result as T
}

/**
 * 删除处理
 */
export const useAffected = async (promise: Promise<DeleteResult | DeleteResult[]>, message = '操作失败') => {
  const result = await promise
  if (Array.isArray(result)) {
    if (result.some(item => !item.affected)) throw new BizException(message)
  } else if (!result.affected) throw new BizException(message)
  return true
}

type PermissionEnumType = typeof PermissionEnum

/**
 * 定义权限
 */
export const definePermission = <T extends string, U extends Record<string, string> | null = null>(prefix: T, action?: U) => {
  const result = Object.entries({
    ...(action || {}),
    list: PermissionEnum.list,
    create: PermissionEnum.create,
    update: PermissionEnum.update,
    delete: PermissionEnum.delete
  }).reduce(
    (prev, [key, value]) => {
      prev[key] = `${prefix}:${value}`
      return prev
    },
    {} as Record<string, string>
  )

  return result as {
    readonly [K in U extends Record<string, string> ? keyof U | keyof PermissionEnumType : keyof PermissionEnumType]: K extends keyof PermissionEnumType
      ? `${T}:${PermissionEnumType[K]}`
      : U extends Record<string, string>
        ? K extends keyof U
          ? `${T}:${U[K]}`
          : never
        : never
  }
}

/**
 * 随机字母
 */
export const useRandomLetter = (length = 1) => Array.from({ length }, () => String.fromCharCode(random(91, 65)).toLowerCase()).join('')

/**
 * 生成随机昵称
 */
export const useRandomName = (prefix = '') => `${prefix}${randomId().slice(0, 17)}`

/**
 * 解析 Excel 文件
 */
export const useXlsx = <T extends Record<string, any>, R extends Record<string, string> = Record<string, string>>(file: Express.Multer.File, field: R) => {
  const workbook = xlsx.read(file.buffer)
  const sheetName = workbook.SheetNames[0] // 获取第一个工作表名称
  const sheet = workbook.Sheets[sheetName]
  const jsonData = xlsx.utils.sheet_to_json(sheet) as Record<string, string | number>[]
  return jsonData.map(item => {
    const reduce = {}
    Object.entries(item).forEach(([key, value]) => {
      Object.entries(field).forEach(([fieldKey, fieldValue]) => {
        key.toLowerCase() === fieldKey && value && (reduce[fieldValue] = value)
      })
    })
    return reduce as T
  })
}

/**
 * 转换 like
 */
export const useTransformLike = (data: Record<string, string | number | undefined>) =>
  Object.entries(data).reduce((prev, [key, value]) => {
    prev[key] = `%${value || ''}%`
    return prev
  }, {})

/**
 * 格式化手机号
 */
export function useFormatMobile(this: { mobile: string }) {
  this.mobile && (this.mobile = this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
}
