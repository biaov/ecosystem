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
  }
}
