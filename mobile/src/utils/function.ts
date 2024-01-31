import { useStore } from '@/stores'
import type { ErrorResponse } from '@/types'

/**
 * 简易深拷贝
 * 当前项目够用
 * 如果需要支持更多类型，推荐使用 `lodash` 的 cloneDeep 方法
 * 或者其它方法
 * @example
 * ```ts
 * import { cloneDeep } from '@/utils/function'
 *
 * const obj = { a: 1, b: 2 }
 * const obj2 = cloneDeep(obj)
 * ```
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
export const toast = (title: string | ErrorResponse) => {
  const tips = typeof title === 'string' ? title : title.data.message
  uni.showToast({
    title: tips,
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

/**
 * 校验手机
 * @example
 * ```ts
 * import { validatorPhone } from '@/utils/function'
 *
 * console.log('校验手机', validatorPhone(12345678901)) // false
 * ```
 */
export const validatorPhone = (phone: unknown) => /^1[3-9]\d{9}$/g.test(`${phone}`)

/**
 * rpx 互转 px
 * @example
 * ```ts
 * import { rpxTransformPx } from '@/utils/function'
 *
 * console.log('rpx 转 px', rpxTransformPx(100)) // 50px
 * console.log('px 转 rpx', rpxTransformPx(50, 'rpx')) // 100rpx
 * ```
 */
export const rpxTransformPx = (num: number, toUnit = 'px') => {
  const { windowWidth } = uni.getSystemInfoSync()
  const radio = windowWidth / 750
  return toUnit === 'px' ? num * radio : num / radio
}
