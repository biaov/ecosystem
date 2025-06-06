/**
 * 注册来源
 */
export const sourceEnum = {
  pc: 1,
  h5: 2,
  app: 3,
  admin: 4,
  miniProgram: 5,
  options() {
    return [
      {
        label: '官网',
        value: this.pc
      },
      {
        label: 'H5',
        value: this.h5
      },
      {
        label: 'APP',
        value: this.app
      },
      {
        label: '控制台',
        value: this.admin
      },
      {
        label: '微信小程序',
        value: this.miniProgram
      }
    ]
  },
  filter(value: number) {
    return this.options().find(item => item.value === value)
  }
}
