import { ActivityCouponModel } from '@/models/promotion'

@Injectable()
export class ActivityCouponService {
  @InjectRepository(ActivityCouponModel)
  private activityCouponRepository: Repository<ActivityCouponModel>

  list({ skip, take, current, pageSize }: PageOption, { name, type }: Partial<Pick<ActivityCouponModel, 'name' | 'type'>>) {
    const where = useTransfrormQuery({ name, type }, { name: 'like' })
    return findAndCount(
      this.activityCouponRepository.find({
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
    return this.activityCouponRepository.findOneBy({ id })
  }
  create({ name, type, value, startTime, endTime }: Pick<ActivityCouponModel, 'name' | 'type' | 'value' | 'startTime'> & { endTime?: string }) {
    const option = useTransfrormQuery({ name, type, value, startTime, endTime }, { startTime: 'datetime', endTime: 'datetime' })
    return this.activityCouponRepository.save(option)
  }
  update(id: number, { name, endTime }: Partial<Pick<ActivityCouponModel, 'name' | 'endTime'>>) {
    const option = useTransfrormQuery({ name, endTime }, { endTime: 'datetime' })
    return useAffected(this.activityCouponRepository.update(id, option))
  }
  async delete(id: number) {
    const coupon = await this.detail(id)
    if (!coupon) throw new BizException('优惠券不存在')
    if (coupon.send) throw new BizException('优惠券已发放，不能删除')
    return useAffected(this.activityCouponRepository.delete({ id }))
  }
}
