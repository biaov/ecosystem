/**
 * 登录数据
 */
export interface UserInfo {
  token: string
  role?: {
    permissions: string[]
  }
  [key: string]: unknown
}
