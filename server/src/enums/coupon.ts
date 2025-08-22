/**
 * 优惠券类型枚举
 */
export enum CouponTypeEnum {
  /**
   * 代金券
   */
  cash = 'cash',
  /**
   * 折扣券
   */
  discount = 'discount',
  /**
   * 满减券
   */
  full = 'full'
}

/**
 * 用户优惠券状态枚举
 */
export enum UserCouponStatusEnum {
  /**
   * 未使用
   */
  normal = 'normal',
  /**
   * 已使用
   */
  used = 'used',
  /**
   * 已过期
   */
  expired = 'expired'
}
