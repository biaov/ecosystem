import type { Relation } from 'typeorm'
import { UserModel } from './user'

@Entity('order')
export class OrderModel extends AddressModel {
  @Column({ length: 64, comment: '订单号' })
  sn: string

  @Column({ length: 12, comment: '订单类型, entity: 实物商品, virtual: 虚拟商品' })
  type: string

  @Column({ length: 16, comment: '订单状态, pay: 待支付, paid: 已支付/待发货, shipped: 已发货/待收货, completed: 已完成, cancelled: 已取消' })
  status: string

  @Column({ comment: '总金额' })
  totalAmount: number

  @Column({ comment: '支付金额' })
  payAmount: number

  @Column({ comment: '优惠金额' })
  discountAmount: number

  @Column({ length: 128, comment: '订单备注', nullable: true })
  remark: string

  @Column({ length: 8, comment: '支付方式, wechat - 微信, alipay - 支付宝, blank - 银行卡' })
  payType: string

  @Column({ type: 'timestamp', comment: '支付时间', nullable: true })
  payTime: string

  @Column({ length: 16, comment: '订单来源: pc - PC 官网, h5 - H5 端, app - APP 端, miniprogram - 微信小程序端' })
  source: string

  @OneToMany(() => OrderItemModel, item => item.order)
  items: Relation<OrderItemModel[]>

  @ManyToOne(() => UserModel, user => user.orders)
  @JoinColumn()
  user: Relation<UserModel>

  @OneToOne(() => OrderTraceModel, trace => trace.order)
  trace: Relation<OrderTraceModel>

  @OneToOne(() => OrderInvoiceModel, invoice => invoice.order)
  invoice: Relation<OrderInvoiceModel>
}

@Entity('order_item')
export class OrderItemModel extends BaseModel {
  @Column({ length: 32, comment: '商品SKU' })
  sku: string

  @Column({ length: 256, comment: '图片' })
  goodsPhoto: string

  @Column({ type: 'decimal', comment: '价格', precision: 10, scale: 2 })
  goodsPrice: number

  @Column({ length: 64, comment: '商品名称' })
  goodsName: string

  @Column({ comment: '商品数量' })
  quantity: number

  @ManyToOne(() => OrderModel, order => order.items)
  @JoinColumn()
  order: Relation<OrderModel>
}

interface TraceType {
  time: string
  message: string
}

@Entity('order_trace')
export class OrderTraceModel extends BaseModel {
  @Column({ length: 24, comment: '快递编码' })
  expressCode: string

  @Column({ length: 64, comment: '快递单号' })
  expressSn: string

  @Column({ type: 'json', comment: '物流信息' })
  traces: TraceType[]

  @OneToOne(() => OrderModel, order => order.trace)
  @JoinColumn()
  order: Relation<OrderModel>

  @OneToOne(() => CreditOrderModel, order => order.trace)
  @JoinColumn()
  creditOrder: Relation<CreditOrderModel>
}

@Entity('order_invoice')
export class OrderInvoiceModel extends BaseModel {
  @Column({ length: 8, comment: '发票类型, normal: 普通发票, vat: 增值税专用发票' })
  type: string

  @Column({ length: 64, comment: '发票抬头' })
  title: string

  @Column({ length: 64, comment: '纳税人识别号' })
  no: string

  @Column({ length: 64, comment: '开户行', nullable: true })
  bank: string

  @Column({ length: 64, comment: '开户行账号', nullable: true })
  bankAccount: string

  @Column({ length: 12, comment: '手机号', nullable: true })
  mobile: string

  @Column({ length: 128, comment: '地址', nullable: true })
  address: string

  @OneToOne(() => OrderModel, order => order.invoice)
  @JoinColumn()
  order: Relation<OrderModel>

  @AfterLoad()
  formatMobile() {
    useFormatMobile.call(this)
  }
}

@Entity('credit_order')
export class CreditOrderModel extends AddressModel {
  @Column({ length: 64, comment: '订单号' })
  sn: string

  @Column({ length: 12, comment: '订单类型, entity: 实物商品, virtual: 虚拟商品' })
  type: string

  @Column({ length: 16, comment: '订单状态, pay: 待支付, paid: 已支付/待发货, shipped: 已发货/待收货, completed: 已完成, cancelled: 已取消' })
  status: string

  @Column({ comment: '兑换积分' })
  credit: number

  @Column({ length: 128, comment: '订单备注', nullable: true })
  remark: string

  @Column({ length: 16, comment: '订单来源: pc - PC 官网, h5 - H5 端, app - APP 端, miniprogram - 微信小程序端' })
  source: string

  @OneToMany(() => CreditOrderItemModel, item => item.order)
  items: Relation<CreditOrderItemModel[]>

  @ManyToOne(() => UserModel, user => user.orders)
  @JoinColumn()
  user: Relation<UserModel>

  @OneToOne(() => OrderTraceModel, trace => trace.creditOrder)
  trace: Relation<OrderTraceModel>
}

@Entity('credit_order_item')
export class CreditOrderItemModel extends BaseModel {
  @Column({ length: 32, comment: '礼品SKU' })
  sku: string

  @Column({ length: 256, comment: '图片' })
  giftPhoto: string

  @Column({ type: 'decimal', comment: '价格', precision: 10, scale: 2 })
  giftCredit: number

  @Column({ length: 64, comment: '礼品名称' })
  giftName: string

  @Column({ comment: '礼品数量' })
  quantity: number

  @ManyToOne(() => CreditOrderModel, order => order.items)
  @JoinColumn()
  order: Relation<CreditOrderModel>
}
