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

  @OneToMany(() => UserCouponModel, userCoupon => userCoupon.coupon)
  userCoupons: Relation<UserCouponModel[]>
}

@Entity('user_coupon')
export class UserCouponModel extends BaseModel {
  @Column({ length: 24, comment: '状态, used: 已使用, expired: 已过期, normal: 未使用' })
  status: string

  @Column({ comment: '优惠券 ID' })
  couponId: number

  @ManyToOne(() => CouponModel, coupon => coupon.userCoupons)
  @JoinColumn()
  coupon: Relation<CouponModel>

  @Column({ comment: '用户 ID' })
  userId: number

  @ManyToOne(() => UserModel, user => user.userCoupons)
  @JoinColumn()
  user: Relation<UserModel>

  @ManyToOne(() => OrderModel, order => order.sn)
  @JoinColumn({ name: 'orderSn' })
  order: Relation<OrderModel>

  @ManyToOne(() => CouponRuleModel, rule => rule.userCoupons)
  @JoinColumn()
  couponRule: Relation<CouponRuleModel>
}

interface Setting {
  theme: string
  background: string
  bgURL: string
  textURL: string
}

@Entity('activity_coupon')
export class ActivityCouponModel extends BaseModel {
  @Column({ length: 64, comment: '活动名称' })
  name: string

  @Column({ type: 'timestamp', comment: '开始时间' })
  startTime: string

  @Column({ type: 'timestamp', comment: '结束时间', nullable: true })
  endTime: string

  @Column({ length: 24, comment: '状态, notStart: 未开始, noraml: 进行中, ended: 已结束' })
  status: string

  @Column({ type: 'json', comment: '页面设置' })
  setting: Setting

  @Column({ type: 'text', comment: '页面描述' })
  desc: string

  @OneToMany(() => CouponRuleModel, rule => rule.activityCoupon)
  rules: Relation<CouponRuleModel[]>
}

@Entity('distribute_coupon')
export class DistributeCouponModel extends BaseModel {
  @Column({ length: 40, comment: '发放主题' })
  title: string

  @Column({ type: 'json', comment: '发放范围' })
  range: string[]

  @OneToMany(() => CouponRuleModel, rule => rule.distributeCoupon)
  rules: Relation<CouponRuleModel[]>
}

@Entity('coupon_rule')
export class CouponRuleModel extends BaseModel {
  @Column({ comment: '发放数量' })
  quantity: number

  @Column({ comment: '优惠券 ID' })
  couponId: number

  @ManyToOne(() => CouponModel)
  @JoinColumn()
  coupon: Relation<CouponModel>

  @ManyToOne(() => DistributeCouponModel, coupon => coupon.rules)
  @JoinColumn()
  distributeCoupon: Relation<DistributeCouponModel>

  @ManyToOne(() => ActivityCouponModel, coupon => coupon.rules)
  @JoinColumn()
  activityCoupon: Relation<ActivityCouponModel>

  @OneToMany(() => UserCouponModel, userCoupon => userCoupon.couponRule)
  userCoupons: Relation<UserCouponModel[]>
}
