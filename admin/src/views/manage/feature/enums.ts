/**
 * 功能平台
 */
export const platforms = Object.freeze({
  /**
   * 微信小程序
   */
  miniprogram: 'miniprogram',

  /**
   * h5
   */
  h5: 'h5',

  /**
   * app
   */
  app: 'app',

  options() {
    return [
      { label: '微信小程序', value: this.miniprogram },
      { label: 'H5', value: this.h5 },
      { label: 'APP', value: this.app }
    ]
  },

  filter(value: string): Record<string, string> {
    return this.options().find(item => item.value === value) ?? {}
  }
})
