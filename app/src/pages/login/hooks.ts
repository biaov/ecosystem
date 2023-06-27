import { useStore } from '@/stores'

/**
 * 操作
 */
export const useHandle = () => {
  const store = useStore()

  /**
   * 登录
   */
  const onLogin = () => {
    store.login({ token: 'token' })
    uni.navigateBack()
  }

  return { onLogin }
}
