import { useStore } from '@/stores'

/**
 * 简易深拷贝
 * 当前项目够用
 * 如果需要支持更多类型，推荐使用 `lodash` 的 cloneDeep 方法
 * 或者其它方法
 */
export const cloneDeep = <T>(arg: T): T => JSON.parse(JSON.stringify(arg))

/**
 * 简易提示
 * @example
 * ```ts
 * import { toast } from '@/utils/function'
 *
 * toast('提示内容')
 * ```
 */
export const toast = (title: string) => {
  uni.showToast({
    title,
    mask: true,
    icon: 'none',
    duration: 2000
  })
}

/**
 * 校验登录
 * @example
 * ```ts
 * import { validatorLogin } from '@/utils/function'
 *
 * const customFeature = () => {
 *   if (!validatorLogin()) return
 * }
 * customFeature()
 * ```
 */
export const validatorLogin = (isJump = true) => {
  const state = useStore()
  if (state.userInfo.id) return true
  isJump && uni.navigateTo({ url: '/pages/auth/login' })
  return false
}
