import { ActivityStatus } from './types'

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

/**
 * 活动状态
 */
export const activityStatus = {
  /**
   * 未开始
   */
  noStart: 'noStart',

  /**
   * 进行中
   */
  normal: 'normal',

  /**
   * 已结束
   */
  ended: 'ended',

  options(): ActivityStatus.Option[] {
    return [
      { label: '未开始', value: this.noStart, status: 'processing' },
      { label: '进行中', value: this.normal, status: 'success' },
      { label: '已结束', value: this.ended, status: 'default' }
    ]
  },
  filter(value: string) {
    return this.options().find(item => item.value === value)!
  }
}
