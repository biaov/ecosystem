import { themeColor } from '@/config/color'

/**
 * 优惠券类型
 */
export const couponTypeEnum = Object.freeze({
  cash: 'cash',
  discount: 'discount',
  full: 'full',
  options() {
    return [
      {
        label: '现金券',
        value: this.cash
      },
      {
        label: '折扣券',
        value: this.discount
      },
      {
        label: '满减券',
        value: this.full
      }
    ]
  },
  filter() {
    return this.options().find(item => item.value)
  }
})

/**
 * 用户优惠券状态
 */
export const couponStatusEnum = Object.freeze({
  normal: 'normal',
  used: 'used',
  expired: 'expired',
  options() {
    return [
      {
        label: '未使用',
        value: this.normal,
        color: themeColor.primary
      },
      {
        label: '已使用',
        value: this.used,
        color: themeColor.success
      },
      {
        label: '已过期',
        value: this.expired,
        color: themeColor.info
      }
    ]
  },
  filter(value: string) {
    return this.options().find(item => item.value === value)
  },
  filterStatus(status: string) {
    return ([this.expired] as string[]).includes(status) ? 'default' : 'processing'
  }
})

/**
 * 优惠券数据查询类型
 */
export const couponDataSearchEnum = defineEnum({
  nickname: 'nickname',
  mobile: 'mobile',
  options() {
    return [
      {
        label: '用户昵称',
        value: this.nickname
      },
      {
        label: '手机号码',
        value: this.mobile
      }
    ]
  }
})
