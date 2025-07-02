import { DeleteResult } from 'typeorm'
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

/**
 * 转换查询条件
 */
export const useTransfrormQuery = (
  data: Record<string, string | string[] | FindOperator<string> | undefined>,
  transform: Record<string, string>
): Record<string, string | string[] | FindOperator<string> | undefined> => {
  Object.entries(transform).forEach(([key, value]) => {
    if (!data[key]) return
    switch (value) {
      case 'like':
        data[key] = Like(`%${data[key]}%`)
        break
      case 'between':
        const val = data[key]
        data[key] = Array.isArray(val) && val.length === 2 ? Between(val[0], val[1]) : undefined
        break
    }
  })

  const filterValue = Object.entries(data).reduce((prev, [key, value]) => {
    value && (prev[key] = value)
    return prev
  }, {})

  return filterValue
}

/**
 * 删除处理
 */
export const useAffected = async (promise: Promise<DeleteResult>) => {
  const result = await promise
  if (!result.affected) throw new BizException('删除失败，数据不存在或已被删除')
  return true
}

/**
 * 定义权限
 */
export const definePermission = <T extends string, U extends Record<string, string>>(prefix: T, action: U = {} as U) => {
  const result = Object.entries({
    ...action,
    list: PermissionEnum.list,
    create: PermissionEnum.create,
    update: PermissionEnum.update,
    delete: PermissionEnum.delete
  }).reduce((prev, [key, value]) => {
    prev[key] = `${prefix}:${value}`
    return prev
  }, {})
  type PermissionEnumType = typeof PermissionEnum
  return result as {
    [K in keyof U | keyof PermissionEnumType]: K extends keyof PermissionEnumType ? `${T}:${PermissionEnumType[K]}` : K extends keyof U ? `${T}:${U[K]}` : never
  }
}
