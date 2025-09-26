/**
 * 随机 ID
 */
export const useRandomId = () => `${+dayjs()}${Math.random().toString(36).slice(-8)}`

/**
 * 校验手机号
 */
export const useValidMobile = (value?: string) => /^1[3-9]\d{9}$/.test(`${value}`)

/**
 * 校验手机号表单
 */
export const useValidMobileForm = (isObj = false) => {
  const validator = (value: string) => {
    if (!useValidMobile(value)) return Promise.reject('手机号格式错误')
    return Promise.resolve()
  }
  return isObj ? { validator } : validator
}
/**
 * 校验邮箱
 */
export const useValidEmail = (value?: string) => /^([A-Za-z0-9_\-\.\\u4e00-\\u9fa5])+@([A-Za-z0-9_\-\.])+\.[A-Za-z]{2,8}$/.test(`${value}`)

/**
 * 校验邮箱表单
 */
export const useValidEmailForm = (isReturnObj = false) => {
  const validator = (value: string) => {
    if (!useValidEmail(value)) return Promise.reject('邮箱格式错误')
    return Promise.resolve(true)
  }
  return isReturnObj ? { validator } : validator
}

/**
 * 设置属性展示
 */
export const useToggle = (initVisible: boolean = false) => {
  /**
   * 值
   */
  const state = ref(initVisible)

  /**
   * 更新值
   */
  const setState = (value: boolean) => {
    state.value = value
  }

  return [state, setState] as const
}
