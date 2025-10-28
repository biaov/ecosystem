import { useConfigThemeColor } from '@/config/color'
/**
 * 注册来源
 */
export const sourceEnum = defineEnum({
  pc: 'pc',
  h5: 'h5',
  app: 'app',
  admin: 'admin',
  miniprogram: 'miniprogram',
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
      // {
      //   label: '控制台',
      //   value: this.admin
      // },
      {
        label: '微信小程序',
        value: this.miniprogram
      }
    ]
  }
})

/**
 * 性别
 */
export const genderEnum = defineEnum({
  woman: 0,
  man: 1,
  other: 2,
  options() {
    return [
      {
        label: '男',
        value: this.man
      },
      {
        label: '女',
        value: this.woman
      },
      {
        label: '保密',
        value: this.other
      }
    ]
  }
})

/**
 * 上下架
 */
export const onsaleEnum = defineEnum({
  true: true,
  false: false,
  options() {
    return [
      {
        label: '上架',
        value: `${this.true}`
      },
      {
        label: '下架',
        value: `${this.false}`
      }
    ]
  }
})

/**
 * 活动状态
 */
export const activityStatusEnum = defineEnum({
  notStart: 'notStart',
  normal: 'normal',
  ended: 'ended',
  options() {
    return [
      {
        label: '未开始',
        value: this.notStart,
        color: useConfigThemeColor.primary
      },
      {
        label: '进行中',
        value: this.normal,
        color: useConfigThemeColor.success
      },
      {
        label: '已结束',
        value: this.ended,
        color: useConfigThemeColor.disabled
      }
    ]
  }
})
