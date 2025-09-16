/**
 * 校验器
 */
export const validator = {
  /**
   * 验证手机号格式
   */
  mobile(mobile: string) {
    const mobileRegex = /^1[3-9]\d{9}$/
    if (!mobileRegex.test(mobile)) throw new BizException('手机号格式错误')
    return true
  },
  email(email: string) {
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!emailRegex.test(email)) throw new BizException('邮箱格式错误')
    return true
  }
}
