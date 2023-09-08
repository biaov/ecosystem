/**
 * 性别列表
 */
export const genderList = {
  /**
   * 保密
   */
  secrecy: 2,

  /**
   * 男
   */
  man: 1,

  /**
   * 女
   */
  woman: 0,

  options() {
    return [
      {
        label: '保密',
        value: this.secrecy
      },
      {
        label: '男',
        value: this.man
      },
      {
        label: '女',
        value: this.woman
      }
    ]
  },
  filter(value?: number) {
    return this.options().find(item => item.value === value)
  }
}
