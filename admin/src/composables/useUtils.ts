/**
 * 随机 ID
 */
export const useRandomId = () => `${+dayjs()}${Math.random().toString(36).slice(-8)}`

/**
 * 校验手机号
 */
export const useValidPhone = (value: string) => /^1[3-9]\d{9}$/.test(value)
