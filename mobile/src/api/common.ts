import { command } from './factory'

/**
 * 图片上传
 */
export const uploadImgApi = command('/upload-img')

/**
 * 静默授权
 */
export const silentAuthApi = command('/silent-auth')

/**
 * 获取最新版本
 */
export const latestVersionApi = command('https://api.github.com/repos/biaov/ecosystem/releases/latest', { unPrefix: true, unAuth: true })
