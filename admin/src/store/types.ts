import type { UserInfo } from '@/types'

/**
 * authSlice - initialState
 */
export interface AuthState {
  token: string | null
  userInfo: Partial<UserInfo>
}
