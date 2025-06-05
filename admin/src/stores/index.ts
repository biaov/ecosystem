import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { LoginData } from './types'

/**
 * 缓存 token
 */
const tokenStorage = getStorage('token') as string

const state = reactive({
  /**
   * 登录状态
   */
  token: tokenStorage
})

export const useStore = () => {
  /**
   * 登录
   */
  const login = ({ token }: LoginData) => {
    state.token = token
    setStorage('token', token)
  }
  /**
   * 登出
   */
  const logout = () => {
    state.token = ''
    removeStorage('token')
  }

  return { login, logout }
}
