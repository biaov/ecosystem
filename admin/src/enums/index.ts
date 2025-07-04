/**
 * 注册来源
 */
export const sourceEnum = Object.freeze({
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
})

/**
 * 性别
 */
export const genderEnum = Object.freeze({
  woman: 0,
  man: 1,
  other: 2,
  options() {
    return [
      {
        label: '女',
        value: this.woman
      },
      {
        label: '男',
        value: this.man
      },
      {
        label: '保密',
        value: this.other
      }
    ]
  },
  filter(value: number) {
    return this.options().find(item => item.value === value)
  }
})

/**
 * 权限枚举
 */
export enum permissionEnum {
  /**
   * 浏览
   */
  list = 'list',
  /**
   * 创建
   */
  create = 'create',

  /**
   * 更新
   */
  update = 'update',

  /**
   * 删除
   */
  delete = 'delete'
}
