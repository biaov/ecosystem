import { restful, command } from './factory'

/**
 * 用户列表
 */
export const userApi = restful('/user')

/**
 * 重置用户密码
 */
export const resetUserPwdApi = (id: number) => command(`/user/${id}/reset-password`)
