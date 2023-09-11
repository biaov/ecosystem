/**
 * 本地 IP
 * 对于 APP 端不能使用 127.0.0.1，所以需要使用本地 IP
 */
const ip = '192.168.10.75'

/**
 * 当前环境的接口前缀
 */
let currentBaseURL: string

// #ifdef H5
currentBaseURL = '/api'
// #endif
// #ifndef H5
currentBaseURL = import.meta.env.MODE === 'development' ? `http://${ip}:3600/api` : 'https://ecosystem.biaov.cn/api'
// #endif

/**
 * 接口前缀
 */
export const baseURL = currentBaseURL

/**
 * 默认页数
 */
export const defaultPageSize = 20

/**
 * 默认头像
 */
export const defaultAvatar = '/static/image/default-avatar.png'
