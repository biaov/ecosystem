import { createSlice } from '@reduxjs/toolkit'
import { setStorage, removeStorage } from '@/utils/storage'
import type { AuthState } from './types'

const initialState: AuthState = { token: null, userInfo: {} }

/**
 * 授权状态
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * 登录
     */
    login: (state, { payload: { token, userInfo } }) => {
      state.token = token
      state.userInfo = userInfo
      setStorage('authInfo', { token, userInfo })
    },
    /**
     * 退出登录
     */
    logout: state => {
      state.token = null
      state.userInfo = {}
      removeStorage('authInfo')
    },
    /**
     * 设置用户信息
     */
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload
      setStorage('authInfo', state)
    }
  }
})
