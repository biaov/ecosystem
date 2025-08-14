import { ActivityCouponModel, CouponRuleModel } from '@/models/promotion'

@Injectable()
export class ActivityCouponService {
  @InjectRepository(ActivityCouponModel)
  private activityCouponRepository: Repository<ActivityCouponModel>

  @InjectRepository(CouponRuleModel)
  private couponRuleRepository: Repository<CouponRuleModel>

  private transformCoupon(item: ActivityCouponModel) {
    let used = 0
    let expired = 0

    const send = item.rules.reduce((prev, rule) => {
      rule.userCoupons.forEach(useCoupon => {
        switch (useCoupon.status) {
          case UserCouponStatusEnum.used:
            used++
            break
          case UserCouponStatusEnum.expired:
            expired++
            break
        }
      })
      return prev + rule.quantity
    }, 0)

    return { ...item, send, used, expired, rules: undefined, setting: undefined }
  }

  async list({ skip, take, current, pageSize }: PageOption, { name, status }: Partial<Pick<ActivityCouponModel, 'name' | 'status'>>) {
    const where = useTransfrormQuery({ name, status }, { name: 'like' })
    const [items, total] = await this.activityCouponRepository
      .createQueryBuilder('activityCoupon')
      .leftJoinAndSelect('activityCoupon.rules', 'rules')
      .leftJoinAndSelect('rules.userCoupons', 'userCoupons')
      .where(where)
      .take(take)
      .skip(skip)
      .orderBy('activityCoupon.createdAt', 'DESC')
      .getManyAndCount()
    const newItems = items.map(this.transformCoupon)
    return { items: newItems, total, current, pageSize }
  }
  detail(id: number) {
    return this.activityCouponRepository.findOne({ where: { id }, relations: ['rules'] })
  }

  private getStatus({ now, start, end }) {
    let status
    if (now < start) {
      status = ActivityStatusEnum.notStart
    } else if (now > end) {
      status = ActivityStatusEnum.ended
    } else {
      status = ActivityStatusEnum.normal
    }
    return status
  }
  async create({
    name,
    startTime,
    endTime,
    setting,
    rules,
    desc
  }: Pick<ActivityCouponModel, 'name' | 'startTime' | 'endTime' | 'setting' | 'desc'> & { rules: Pick<CouponRuleModel, 'quantity' | 'couponId'>[] }) {
    const now = dayjs()
    const start = dayjs(startTime)
    const end = dayjs(endTime)
    if (end <= start) throw new BizException('结束时间不能早于开始时间')
    const status = this.getStatus({ now, start, end })
    const option = useTransfrormQuery({ name, startTime, endTime, setting, desc, status }, { startTime: 'datetime', endTime: 'datetime' })
    const activityCoupon = await this.activityCouponRepository.save(option)
    const newRules = rules.map(({ couponId, quantity }) => ({ couponId, quantity, activityCoupon: { id: activityCoupon.id } }))
    await this.couponRuleRepository.save(newRules)
    return activityCoupon
  }
  async update(id: number, { name, endTime, setting, desc }: Partial<Pick<ActivityCouponModel, 'name' | 'endTime' | 'setting' | 'desc'>>) {
    const activityCoupon = await this.detail(id)
    if (!activityCoupon) throw new BizException('优惠券不存在')
    if (activityCoupon.status === ActivityStatusEnum.ended) throw new BizException('活动已结束，不能修改')

    const now = dayjs()
    const start = dayjs(activityCoupon.startTime)
    const end = dayjs(endTime)
    if (end <= start) throw new BizException('结束时间不能早于开始时间')
    const status = this.getStatus({ now, start, end })
    const option = useTransfrormQuery({ name, endTime, setting, desc, status }, { endTime: 'datetime' })
    return useAffected(this.activityCouponRepository.update(id, option))
  }
  async delete(id: number) {
    const activityCoupon = await this.detail(id)
    if (!activityCoupon) throw new BizException('优惠券不存在')
    if (activityCoupon.status !== ActivityStatusEnum.notStart) throw new BizException('活动已开始，不能删除')
    await this.couponRuleRepository.delete({ activityCoupon: { id } })
    return useAffected(this.activityCouponRepository.delete({ id }))
  }
}
