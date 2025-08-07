import type { Relation } from 'typeorm'
import { UserModel } from './user'
import { OrderModel } from './order'

@Entity('coupon')
export class CouponModel extends BaseModel {
  @Column({ length: 24, comment: '编码' })
  code: string

  @Column({ length: 64, comment: '名称' })
  name: string

  @Column({ length: 12, comment: '类型, cash: 代金券, discount: 折扣券, full: 满减券' })
  type: string

  @Column({ type: 'float', precision: 10, scale: 2, comment: '价值' })
  value: number

  @Column({ type: 'float', precision: 10, scale: 2, comment: '满足条件', nullable: true, default: 0 })
  condition: number

  @Column({ type: 'timestamp', comment: '开始时间' })
  startTime: string

  @Column({ type: 'timestamp', comment: '结束时间', nullable: true })
  endTime: string

  @Column({ comment: '发放数量', default: 0 })
  send: number

  @Column({ comment: '核销数量', default: 0 })
  used: number

  @Column({ comment: '过期数量', default: 0 })
  expired: number

  @OneToMany(() => UserCouponModel, userCoupon => userCoupon.coupon)
  userCoupons: Relation<UserCouponModel[]>
}

@Entity('user_coupon')
export class UserCouponModel extends BaseModel {
  @Column({ length: 24, comment: '状态, used: 已使用, expired: 已过期, normal: 未使用' })
  status: string

  @ManyToOne(() => CouponModel, coupon => coupon.userCoupons)
  @JoinColumn()
  coupon: Relation<CouponModel>

  @ManyToOne(() => UserModel, user => user.userCoupons)
  @JoinColumn()
  user: Relation<UserModel>

  @ManyToOne(() => OrderModel, order => order.sn)
  @JoinColumn({ name: 'orderSn' })
  order: Relation<OrderModel>
}

@Entity('activity_coupon')
export class ActivityCouponModel extends BaseModel {}

@Entity('distribute_coupon')
export class DistributeCouponModel extends BaseModel {}
