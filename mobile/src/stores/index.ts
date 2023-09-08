import { defineStore } from 'pinia'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import type { LoginData, UserInfo } from './types'

/**
 * 缓存 token
 */
const tokenStorage = getStorage('token') as string
const userInfoStorage = (getStorage('userInfo') as Partial<UserInfo>) || {}

export const useStore = defineStore('main', {
  state: () => ({
    token: tokenStorage,
    userInfo: userInfoStorage
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      setStorage('token', token)
    },
    setUserInfo(userInfo: UserInfo) {
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
  },
  getters: {
    isLogin: state => !!state.userInfo.id
  }
})
