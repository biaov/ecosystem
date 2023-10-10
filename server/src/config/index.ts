export { port } from './port'

/**
 * 路由前缀
 */
export const baseURL = '/api'

/**
 * 域名
 */
export const domainName = import.meta.env.PROD ? 'http://ecosystem.biaov.cn/server/' : 'http://127.0.0.1:3600/'

/**
 * 最大上传文件, 单位: 字节 b
 */
export const maxFileSize = 1024 * 1024 * 1

/**
 * 文件目录
 */
export const uploadDir = 'uploads/'
