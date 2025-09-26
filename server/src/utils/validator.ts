export const mobileRegExp = /^1[3-9]\d{9}$/
export const emailRegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
/**
 * 校验器
 */
export const validator = {
  /**
   * 验证手机号格式
   */
  mobile(mobile: string) {
    if (!mobileRegExp.test(mobile)) throw new BizException('手机号格式错误')
    return true
  },
  email(email: string) {
    if (!emailRegExp.test(email)) throw new BizException('邮箱格式错误')
    return true
  }
}
