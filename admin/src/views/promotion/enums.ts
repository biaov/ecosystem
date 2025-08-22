import { themeColor } from '@/config/color'

/**
 * 优惠券类型
 */
export const couponTypeEnum = defineEnum({
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
})

/**
 * 用户优惠券状态
 */
export const couponStatusEnum = defineEnum({
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

/**
 * 手动发券查询类型
 */
export const distributeCouponSearchEnum = defineEnum({
  title: 'title',
  mobile: 'mobile',
  options() {
    return [
      {
        label: '发券主题',
        value: this.title
      },
      {
        label: '手机号码',
        value: this.mobile
      }
    ]
  }
})
