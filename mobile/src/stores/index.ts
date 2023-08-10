import { defineStore } from 'pinia'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { LoginData } from './types'

/**
 * 缓存 token
 */
const tokenStorage = getStorage('token') as string
const userInfoStorage = (getStorage('userInfo') as Record<string, unknown>) ?? {}

export const useStore = defineStore('main', {
  state: () => ({
    /**
     * 登录状态
     */
    token: tokenStorage,
    userInfo: userInfoStorage
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      setStorage('token', token)
    },
    setUserInfo(userInfo: Record<string, unknown>) {
      this.userInfo = userInfo
      setStorage('userInfo', userInfo)
    },
    clearToken() {
      this.token = ''
      removeStorage('token')
    },
    clearUserInfo() {
      this.userInfo = {}
      removeStorage('userInfo')
    },
    /**
     * 登录
     */
    login({ token, userInfo }: LoginData) {
      this.setToken(token)
      this.setUserInfo(userInfo)
    },
    /**
     * 登出
     */
    logout() {
      this.clearToken()
      this.clearUserInfo()
    }
  }
})
