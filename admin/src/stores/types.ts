/**
 * 登录数据
 */
export interface UserInfo {
  token: string
  id: number
  nickname: string
  avatar: string
  email: string
  gender: number
  source: number
  roleId: number
  role?: {
    permissions: string[]
  }
  [key: string]: unknown
}
