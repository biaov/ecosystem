import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { UserInfo } from './types'

/**
 * 缓存 token
 */
const tokenStorage = getStorage('token') as string

const state = reactive({
  /**
   * 登录状态
   */
  token: tokenStorage,
  /**
   * 用户信息
   */
  userInfo: getStorage('userInfo') as UserInfo | null
})

export const useStore = () => {
  /**
   * 登录
   */
  const login = (userInfo: UserInfo) => {
    state.token = userInfo.token
    state.userInfo = userInfo
    setStorage('token', state.token)
    setStorage('userInfo', state.userInfo)
  }
  /**
   * 登出
   */
  const logout = () => {
    state.token = ''
    state.userInfo = null
    removeStorage('token')
    removeStorage('userInfo')
  }

  const isLogin = computed(() => !!state.token)

  return { state: readonly(state), login, logout, isLogin }
}
