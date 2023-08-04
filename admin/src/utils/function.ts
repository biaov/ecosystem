import { colorList } from '@/config'
import store from '@/store'
import type { UserInfo, Pagination } from '@/types'

/**
 * 随机颜色
 * @example
 * ```js
 * import { randomColor } from '@/utils/function'
 *
 * randomColor() // #2d8cf0
 * ```
 */
export const randomColor = () => colorList[Math.floor(Math.random() * (colorList.length + 1))]

/**
 * 批量随机颜色
 * @example
 * ```js
 * import { randomColors } from '@/utils/function'
 *
 * randomColors() // #2d8cf0
 * ```
 */
export const randomColors = (length: number, colors: string[] = []): string[] => {
  if (colors.length === length) return colors

  const color = randomColor()
  !colors.includes(color) && colors.push(color)

  return randomColors(length, colors)
}

/**
 * 检查权限
 * @example
 * ```JS
 * // mixins
 * const hasPermission = checkPermission('video-list')
 * console.log(hasPermission) // true | false
 * ```
 */
export const checkPermission = (value: string | string[]): boolean => {
  /**
   * 权限
   */
  const { permissions } = store.getState().userInfo as UserInfo

  /**
   * 所有权限
   */
  if (permissions.includes('*')) return true

  /**
   * 是否有权限，一个或多个权限，权限都没有才可以操作
   */
  const permission = Array.isArray(value) ? [...value] : [value]

  return permission.some(permis => permissions.includes(permis))
}

/**
 * 分页器
 */
export const paginationRewrite = ({ total, pageSize, current }: Pagination) => ({
  total,
  current,
  pageSize,
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: (curTotal: number) => `总共 ${curTotal} 条`
})

/**
 * 简易深拷贝
 * 当前项目够用
 * 如果需要支持更多类型，推荐使用 `lodash` 的 cloneDeep 方法
 * 或者其它方法
 */
export const cloneDeep = <T>(arg: T): T => JSON.parse(JSON.stringify(arg))

/**
 * 随机 ID
 */
export const randomId = () => `${+new Date()}${Math.random().toString(36).substring(2)}`
