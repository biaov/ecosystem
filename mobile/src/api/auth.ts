import { command } from './factory'

/**
 * 登录
 */
export const loginApi = command('/login')

/**
 * 注册
 */
export const registerApi = command('/register')

/**
 * 修改密码
 */
export const editPwdApi = command('/edit-password')
