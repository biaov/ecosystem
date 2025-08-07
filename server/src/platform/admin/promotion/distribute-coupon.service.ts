import { DistributeCouponModel } from '@/models/promotion'

@Injectable()
export class DistributeCouponService {
  @InjectRepository(DistributeCouponModel)
  private distributeCouponRepository: Repository<DistributeCouponModel>

  list({ skip, take, current, pageSize }: PageOption, { name, type }: Partial<Pick<DistributeCouponModel, 'name' | 'type'>>) {
    const where = useTransfrormQuery({ name, type }, { name: 'like' })
    return findAndCount(
      this.distributeCouponRepository.find({
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
    return this.distributeCouponRepository.findOneBy({ id })
  }
  create({ name, type, value, startTime, endTime }: Pick<DistributeCouponModel, 'name' | 'type' | 'value' | 'startTime'> & { endTime?: string }) {
    const option = useTransfrormQuery({ name, type, value, startTime, endTime }, { startTime: 'datetime', endTime: 'datetime' })
    return this.distributeCouponRepository.save(option)
  }
  update(id: number, { name, endTime }: Partial<Pick<DistributeCouponModel, 'name' | 'endTime'>>) {
    const option = useTransfrormQuery({ name, endTime }, { endTime: 'datetime' })
    return useAffected(this.distributeCouponRepository.update(id, option))
  }
  async delete(id: number) {
    const coupon = await this.detail(id)
    if (!coupon) throw new BizException('优惠券不存在')
    if (coupon.send) throw new BizException('优惠券已发放，不能删除')
    return useAffected(this.distributeCouponRepository.delete({ id }))
  }
}
