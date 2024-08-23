import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import type { LoginData, UserInfo } from './types'

/**
 * 缓存 token
 */
const tokenStorage = getStorage('token') as string
const userInfoStorage = (getStorage('userInfo') as Partial<UserInfo>) || {}

const state = reactive({
  token: tokenStorage,
  userInfo: userInfoStorage
})

export const useStore = () => {
  const setToken = (token: string) => {
    state.token = token
    setStorage('token', token)
  }
  const clearToken = () => {
    state.token = ''
    removeStorage('token')
  }
  const setUserInfo = (userInfo: LoginData['userInfo']) => {
    state.userInfo = userInfo
    setStorage('userInfo', userInfo)
  }
  const clearUserInfo = () => {
    state.userInfo = {}
    removeStorage('userInfo')
  }
  const login = ({ token, userInfo }: LoginData) => {
    setToken(token)
    setUserInfo(userInfo)
  }
  const logout = () => {
    clearToken()
    clearUserInfo()
  }

  const isLogin = computed(() => !!state.userInfo.id)

  return {
    state: readonly(state),
    isLogin,
    login,
    logout,
    setToken,
    clearToken,
    setUserInfo,
    clearUserInfo
  }
}
