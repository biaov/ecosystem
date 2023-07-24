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
 * 分页器
 */
export interface Pagination {
  current: number
  pageSize: number
  total: number
}

/**
 * 引用类型
 */
export interface Ref<T> {
  value: T
}
