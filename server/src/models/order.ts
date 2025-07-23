import type { Relation } from 'typeorm'
import { UserModel } from './user'

@Entity('order')
export class OrderModel extends AddressModel {
  @Column({ length: 64, comment: '订单号' })
  sn: string

  @Column({ length: 16, comment: '订单状态, pay: 待支付, paid: 已支付/待发货, shipped: 已发货/待收货, completed: 已完成, cancelled: 已取消' })
  status: string

  @Column({ comment: '总金额' })
  totalAmount: number

  @Column({ comment: '支付金额' })
  payAmount: number

  @Column({ comment: '优惠金额' })
  discountAmount: number

  @Column({ type: 'timestamp', comment: '支付时间', nullable: true })
  payTime: string

  @OneToMany(() => OrderItemsModel, item => item.order)
  items: Relation<OrderItemsModel[]>

  @ManyToOne(() => UserModel, user => user.orders)
  @JoinColumn()
  user: Relation<UserModel>
}

@Entity('order_items')
export class OrderItemsModel extends BaseModel {
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

@Entity('credit_order')
export class CreditOrderModel extends AddressModel {
  @Column({ length: 64, comment: '订单号' })
  sn: string

  @Column({ length: 16, comment: '订单状态, pay: 待支付, paid: 已支付/待发货, shipped: 已发货/待收货, completed: 已完成, cancelled: 已取消' })
  status: string

  @Column({ comment: '兑换积分' })
  credit: number

  @Column({ type: 'timestamp', comment: '兑换时间', nullable: true })
  exchangeTime: string

  @OneToMany(() => CreditOrderItemsModel, item => item.order)
  items: Relation<CreditOrderItemsModel[]>

  @ManyToOne(() => UserModel, user => user.orders)
  @JoinColumn()
  user: Relation<UserModel>
}

@Entity('credit_order_items')
export class CreditOrderItemsModel extends BaseModel {
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
