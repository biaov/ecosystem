/**
 * 弹窗广告类型
 */
export const advType = Object.freeze({
  everyday: 'everyday',
  once: 'once',
  options() {
    return [
      {
        label: '每天一次',
        value: this.everyday
      },
      {
        label: '永久一次',
        value: this.once
      }
    ]
  },
  filter(value: string) {
    return this.options().find(item => item.value === value)
  }
})
