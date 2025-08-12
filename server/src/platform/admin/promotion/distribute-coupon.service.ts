import { DistributeCouponModel, DistributeCouponRuleModel } from '@/models/promotion'

@Injectable()
export class DistributeCouponService {
  @InjectRepository(DistributeCouponModel)
  private distributeCouponRepository: Repository<DistributeCouponModel>

  @InjectRepository(DistributeCouponRuleModel)
  private distributeCouponRuleRepository: Repository<DistributeCouponRuleModel>

  @InjectRepository(UserCouponModel)
  private userCouponRepository: Repository<UserCouponModel>

  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  private transformCoupon(item: DistributeCouponModel) {
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

    return { ...item, send, used, expired, rules: undefined }
  }

  async list({ skip, take, current, pageSize }: PageOption, { title, mobile }: Partial<Pick<DistributeCouponModel, 'title'>> & { mobile?: string }) {
    const where = useTransfrormQuery({ title }, { title: 'like' })
    const [items, total] = await this.distributeCouponRepository
      .createQueryBuilder('distributeCoupon')
      .leftJoinAndSelect('distributeCoupon.rules', 'rules')
      .leftJoinAndSelect('rules.userCoupons', 'userCoupons')
      .leftJoinAndSelect('userCoupons.user', 'user')
      .where(where)
      .andWhere(...useTransfrormQuery<[string, {}]>({ 'user.mobile': mobile }, { 'user.mobile': 'like' }))
      .take(take)
      .skip(skip)
      .orderBy('distributeCoupon.createdAt', 'DESC')
      .getManyAndCount()
    const newItems = items.map(this.transformCoupon)
    return { items: newItems, total, current, pageSize }
  }
  detail(id: number) {
    return this.distributeCouponRepository.findOne({ where: { id }, relations: ['rules'] })
  }
  async create({ title, range, rules }: Pick<DistributeCouponModel, 'title' | 'range'> & { rules: Pick<DistributeCouponRuleModel, 'quantity' | 'couponId'>[] }) {
    const list = [...new Set(range.filter(item => validator.mobile(item)))]
    if (!list.length) throw new BizException('请输入正确的手机号')
    const option = useTransfrormQuery({ title, range: list }, {})
    /**
     * 手动发券规则
     */
    const distributeCoupon = await this.distributeCouponRepository.save(option)

    /**
     * 发放优惠券
     */
    const users = await this.userRepository.find({ where: list.map(mobile => ({ mobile })), select: ['id'] })

    const ruleData = await this.distributeCouponRuleRepository.save(rules.map(item => ({ quantity: item.quantity, couponId: item.couponId, distributeCoupon: { id: distributeCoupon.id } })))

    const sendCouponOptions = ruleData
      .map(item =>
        users.map(userInfo =>
          Array.from({ length: item.quantity }, () => ({
            distributeCouponRule: { id: item.id },
            userId: userInfo.id,
            couponId: item.couponId,
            status: UserCouponStatusEnum.normal
          }))
        )
      )
      .flat(2)
    await this.userCouponRepository.save(sendCouponOptions)
    return distributeCoupon
  }
}
