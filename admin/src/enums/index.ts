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

/**
 * 展示状态
 */
export const showStatus = {
  /**
   * 展示
   */
  show: true,

  /**
   * 隐藏
   */
  hide: false,

  options() {
    return [
      {
        label: '展示',
        value: this.show
      },
      {
        label: '隐藏',
        value: this.hide
      }
    ]
  },
  filter(value?: boolean) {
    return this.options().find(item => item.value === value)
  }
}
