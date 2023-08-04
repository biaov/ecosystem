import md5 from 'md5'

/**
 * 默认用户配置
 */
export const defaultUserConfig = (option: Record<string, unknown> = {}) => ({ avatar: 'https://dummyimage.com/100x100/6f86d6/fff&text=.', gender: 2, nickname: '游客', roleCode: 'tourist', ...option })

/**
 * 默认密码
 */
export const defaultPassword = md5('123456')
