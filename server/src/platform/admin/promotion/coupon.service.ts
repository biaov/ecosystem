import { CouponModel } from '@/models/promotion'

@Injectable()
export class CouponService {
  @InjectRepository(CouponModel)
  private couponRepository: Repository<CouponModel>

  @InjectRepository(UserCouponModel)
  private userCouponRepository: Repository<UserCouponModel>

  list({ skip, take, current, pageSize }: PageOption, { name, type }: Partial<Pick<CouponModel, 'name' | 'type'>>) {
    const where = useTransfrormQuery({ name, type }, { name: 'like' })
    return findAndCount(
      this.couponRepository.findAndCount({
        where,
        skip,
        take,
        order: {
          createdAt: 'DESC'
        }
      }),
      { current, pageSize }
    )
  }
  detail(id: number) {
    return this.couponRepository.findOneBy({ id })
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
    if (coupon.send) throw new BizException('优惠券已发放，不能删除')
    return useAffected(this.couponRepository.delete({ id }))
  }
  statisticInfo(id: number) {
    return this.couponRepository
      .createQueryBuilder('coupon')
      .leftJoinAndSelect('coupon.userCoupons', 'userCoupons')
      .where({ id })
      .select(['send', 'used', 'COUNT(distinct userCoupons.userId) AS userCount'])
      .getRawOne()
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
