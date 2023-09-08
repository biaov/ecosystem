/**
 * 用户信息
 */
export interface UserInfo {
  id: number
  permissions: string[]
  nickname: string
  avatar: string
  phoneNumber: string
  email: string
  gender: number
  roleCode: string
  createdAt: string
  signature: string
}

/**
 * 登录数据
 */
export interface LoginData {
  token: string
  userInfo: UserInfo
}
