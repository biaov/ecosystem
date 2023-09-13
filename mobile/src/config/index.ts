/**
 * 当前环境的接口前缀
 */
let currentBaseURL: string

// #ifdef H5
currentBaseURL = '/api'
// #endif
// #ifndef H5
currentBaseURL = import.meta.env.VITE_BASE_URL
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
