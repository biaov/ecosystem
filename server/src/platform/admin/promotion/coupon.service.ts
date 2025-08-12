import { CouponModel } from '@/models/promotion'

@Injectable()
export class CouponService {
  @InjectRepository(CouponModel)
  private couponRepository: Repository<CouponModel>

  @InjectRepository(UserCouponModel)
  private userCouponRepository: Repository<UserCouponModel>

  private transformCoupon(item: CouponModel) {
    const send = item.userCoupons.length
    let used = 0
    let expired = 0
    const userIds = item.userCoupons.map(useCoupon => {
      switch (useCoupon.status) {
        case UserCouponStatusEnum.used:
          used++
          break
        case UserCouponStatusEnum.expired:
          expired++
          break
      }
      return useCoupon.userId
    })
    const userCount = [...new Set(userIds)].length
    return { ...item, send, used, expired, userCount, userCoupons: undefined }
  }

  async list({ skip, take, current, pageSize }: PageOption, { name, type }: Partial<Pick<CouponModel, 'name' | 'type'>>) {
    const where = useTransfrormQuery({ name, type }, { name: 'like' })
    const [items, total] = await this.couponRepository.findAndCount({
      where,
      skip,
      take,
      order: {
        createdAt: 'DESC'
      },
      relations: ['userCoupons']
    })
    const newItems = items.map(this.transformCoupon)
    return { items: newItems, total, current, pageSize }
  }
  all() {
    return this.couponRepository.find({ order: { createdAt: 'DESC' } })
  }
  detail(id: number) {
    return this.couponRepository.findOne({ where: { id }, relations: ['userCoupons'] })
  }
  create({ name, type, value, condition, startTime, endTime }: Pick<CouponModel, 'name' | 'type' | 'value' | 'startTime'> & { endTime?: string; condition?: number }) {
    const code = useRandomName()
    const option = useTransfrormQuery({ name, type, value, condition, startTime, endTime, code }, { startTime: 'datetime', endTime: 'datetime' })
    return this.couponRepository.save(option)
  }
  update(id: number, { name, endTime }: Partial<Pick<CouponModel, 'name' | 'endTime'>>) {
    const option = useTransfrormQuery({ name, endTime }, { endTime: 'datetime' })
    return useAffected(this.couponRepository.update(id, option))
  }
  async delete(id: number) {
    const coupon = await this.detail(id)
    if (!coupon) throw new BizException('优惠券不存在')
    if (coupon.userCoupons.length) throw new BizException('优惠券已发放，不能删除')
    return useAffected(this.couponRepository.delete({ id }))
  }
  async statisticInfo(id: number) {
    const coupon = await this.detail(id)
    if (!coupon) throw new BizException('优惠券不存在')
    return this.transformCoupon(coupon)
  }
  statistic(id: number, { skip, take, current, pageSize }: PageOption, { status, nickname, mobile }: { status?: string; nickname?: string; mobile?: string }) {
    return findAndCount(
      this.userCouponRepository
        .createQueryBuilder('userCoupon')
        .leftJoinAndSelect('userCoupon.user', 'user')
        .leftJoinAndSelect('userCoupon.coupon', 'coupon')
        .where(useTransfrormQuery({ status }, {}))
        .andWhere(
          ...useTransfrormQuery<[string, {}]>(
            {
              'user.nickname': nickname,
              'user.mobile': mobile,
              'coupon.id': id
            },
            {
              'user.nickname': 'like',
              'user.mobile': 'like'
            }
          )
        )
        .take(take)
        .skip(skip)
        .orderBy('userCoupon.createdAt', 'DESC')
        .getManyAndCount(),
      { current, pageSize }
    )
  }
}
