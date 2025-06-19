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
export const getPageQuery = ({ current, pageSize }: { current?: number; pageSize?: number } = initPage) => {
  const newCurrent = current || initPage.current
  const take = pageSize || initPage.pageSize
  const skip = (newCurrent - 1) * take

  return { take, skip }
}
