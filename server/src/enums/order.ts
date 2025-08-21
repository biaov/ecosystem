/**
 * 订单状态枚举
 */
export enum OrderStatusEnum {
  /**
   * 待支付
   */
  pay = 'pay',

  /**
   * 已支付/待发货
   */
  paid = 'paid',

  /**
   * 已发货/待收货
   */
  shipped = 'shipped',

  /**
   * 已完成
   */
  completed = 'completed',

  /**
   * 已取消
   */
  cancelled = 'cancelled'
}

/**
 * 订单支付状态枚举
 */
export enum PayStatusEnum {
  /**
   * 未支付
   */
  pay = 'pay',

  /**
   * 已支付
   */
  paid = 'paid'
}

/**
 * 订单类型枚举
 */
export enum OrderTypeEnum {
  /**
   * 实物商品
   */
  entity = 'entity',

  /**
   * 虚拟商品
   */
  virtual = 'virtual'
}

/**
 * 售后订单状态枚举
 */
export enum SaleOrderStatusEnum {
  /**
   * 申请中
   */
  normal = 'normal',

  /**
   * 已同意/待发货
   */
  agreed = 'agreed',

  /**
   * 待签收
   */
  receiving = 'receiving',

  /**
   * 待退款
   */
  refunding = 'refunding',

  /**
   * 已退款
   */
  refunded = 'refunded',

  /**
   * 已拒绝
   */
  rejected = 'rejected',

  /**
   * 已关闭
   */
  closed = 'closed'
}

/**
 * 售后订单类型枚举
 */
export enum SaleOrderTypeEnum {
  /**
   * 仅退款
   */
  refund = 'refund',

  /**
   * 退货退款
   */
  return = 'return'
}
