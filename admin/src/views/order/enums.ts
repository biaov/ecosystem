import { themeColor } from '@/config/color'

/**
 * 订单搜索
 */
export const orderSearchEnum = defineEnum({
  sn: 'sn',
  nickname: 'nickname',
  mobile: 'mobile',
  name: 'name',
  sku: 'sku',
  options() {
    return [
      {
        label: '订单编号',
        value: this.sn
      },
      {
        label: '用户昵称',
        value: this.nickname
      },
      {
        label: '用户手机号',
        value: this.mobile
      },
      {
        label: '商品名称',
        value: this.name
      },
      {
        label: '商品SKU',
        value: this.sku
      }
    ]
  }
})

/**
 * 订单状态
 */
export const orderStatusEnum = defineEnum({
  pay: 'pay',
  paid: 'paid',
  shipped: 'shipped',
  completed: 'completed',
  cancelled: 'cancelled',
  options() {
    return [
      {
        label: '待支付',
        value: this.pay,
        color: themeColor.primary
      },
      {
        label: '待发货',
        value: this.paid,
        color: themeColor.danger
      },
      {
        label: '待收货',
        value: this.shipped,
        color: themeColor.warning
      },
      {
        label: '已完成',
        value: this.completed,
        color: themeColor.success
      },
      {
        label: '已取消',
        value: this.cancelled,
        color: themeColor.disabled
      }
    ]
  },
  filterStatus(status: string) {
    return ([this.completed, this.cancelled] as string[]).includes(status) ? 'default' : 'processing'
  }
})

/**
 * 订单类型
 */
export const orderTypeEnum = defineEnum({
  entity: 'entity',
  virtual: 'virtual',
  options() {
    return [
      {
        label: '实物商品',
        value: this.entity
      },
      {
        label: '虚拟商品',
        value: this.virtual
      }
    ]
  }
})

/**
 * 支付方式
 */
export const payTypeEnum = defineEnum({
  wechat: 'wechat',
  alipay: 'alipay',
  bank: 'bank',
  options() {
    return [
      {
        label: '微信',
        value: this.wechat
      },
      {
        label: '支付宝',
        value: this.alipay
      },
      {
        label: '银行卡',
        value: this.bank
      }
    ]
  }
})

/**
 * 发票类型
 */
export const invoiceTypeEnum = defineEnum({
  normal: 'normal',
  vat: 'vat',
  options() {
    return [
      {
        label: '普通发票',
        value: this.normal
      },
      {
        label: '增值税发票',
        value: this.vat
      }
    ]
  }
})

/**
 * 售后订单搜索
 */
export const saleOrderSearchEnum = defineEnum({
  orderSn: 'orderSn',
  sn: 'sn',
  nickname: 'nickname',
  mobile: 'mobile',
  name: 'name',
  sku: 'sku',
  options() {
    return [
      {
        label: '订单编号',
        value: this.orderSn
      },
      {
        label: '服务单号',
        value: this.sn
      },
      {
        label: '用户昵称',
        value: this.nickname
      },
      {
        label: '用户手机号',
        value: this.mobile
      },
      {
        label: '商品名称',
        value: this.name
      },
      {
        label: '商品SKU',
        value: this.sku
      }
    ]
  }
})

/**
 * 售后订单状态
 */
export const saleOrderStatusEnum = defineEnum({
  normal: 'normal',
  agreed: 'agreed',
  receiving: 'receiving',
  refunding: 'refunding',
  refunded: 'refunded',
  rejected: 'rejected',
  closed: 'closed',
  options() {
    return [
      {
        label: '申请中',
        value: this.normal,
        color: themeColor.primary
      },
      {
        label: '待发货',
        value: this.agreed,
        color: themeColor.primary
      },
      {
        label: '待签收',
        value: this.receiving,
        color: themeColor.warning
      },
      {
        label: '待退款',
        value: this.refunding,
        color: themeColor.warning
      },
      {
        label: '已退款',
        value: this.refunded,
        color: themeColor.success
      },
      {
        label: '已拒绝',
        value: this.rejected,
        color: themeColor.danger
      },
      {
        label: '已关闭',
        value: this.closed,
        color: themeColor.disabled
      }
    ]
  },
  filterStatus(status: string) {
    return ([this.closed, this.refunded] as string[]).includes(status) ? 'default' : 'processing'
  }
})

/**
 * 售后订单类型
 */
export const saleOrderTypeEnum = defineEnum({
  refund: 'refund',
  return: 'return',
  options() {
    return [
      {
        label: '仅退款',
        value: this.refund
      },
      {
        label: '退货退款',
        value: this.return
      }
    ]
  }
})

/**
 * 售后审核状态
 */
export const saleOrderExamineStatusEnum = defineEnum({
  agree: 'agree',
  reject: 'reject',
  options() {
    return [
      {
        label: '同意',
        value: this.agree
      },
      {
        label: '拒绝',
        value: this.reject
      }
    ]
  }
})
