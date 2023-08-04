import { defineStore } from 'pinia'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { LoginData } from './types'

/**
 * 缓存 token
 */
const tokenStorage = getStorage('token') as string

export const useStore = defineStore('main', {
  state: () => ({
    /**
     * 登录状态
     */
    token: tokenStorage
  }),
  actions: {
    /**
     * 登录
     */
    login({ token }: LoginData) {
      this.token = token
      setStorage('token', token)
    },
    /**
     * 登出
     */
    logout() {
      this.token = ''
      removeStorage('token')
    }
  }
})
