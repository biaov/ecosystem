/**
 * 弹窗广告类型
 */
export const advType = defineEnum({
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
  }
})
