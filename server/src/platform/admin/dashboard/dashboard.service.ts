import type { Dayjs } from 'dayjs'

/**
 * 一周数据
 */
const day = 7

@Injectable()
export class DashboardService {
  @InjectRepository(OrderModel)
  private orderRepository: Repository<OrderModel>

  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  private transformStatic(now: Dayjs, list: { label: string; value: number }[]) {
    return Array.from({ length: day }, (_, i) => {
      const label = now.add(-i, 'd').format('YYYY-MM-DD')
      const value = +(list.find(item => item.label === label)?.value ?? 0)
      return { label, value }
    })
  }

  async static() {
    const now = dayjs()
    const nowStr = now.format('YYYY-MM-DD HH:mm:ss')
    const createdAt = MoreThan(now.startOf('day').toDate())
    const orderWhere = { payStatus: PayStatusEnum.paid }
    const groupWhere = { payTime: createdAt, ...orderWhere }
    const weekWhere = Between(now.add(1 - day, 'd').format('YYYY-MM-DD'), now.add(1, 'd').format('YYYY-MM-DD'))
    const [orders, users, ...groupCount] = await Promise.all([
      this.orderRepository
        .createQueryBuilder('order')
        .where({ ...orderWhere, payTime: weekWhere })
        .select('DATE(order.payTime) AS label')
        .addSelect('SUM(order.payAmount) AS value')
        .groupBy('label')
        .getRawMany(),
      this.userRepository.createQueryBuilder('user').where({ createdAt: weekWhere }).select('DATE(user.createdAt) AS label').addSelect('COUNT(user.id) AS value').groupBy('label').getRawMany(),
      this.userRepository.countBy({ createdAt }),
      this.userRepository.count(),
      this.orderRepository.countBy(groupWhere),
      this.orderRepository.countBy(orderWhere),
      this.orderRepository.sum('payAmount', orderWhere),
      this.orderRepository.sum('payAmount', groupWhere)
    ])
    const [userCount, totalUserCount, orderCount, totalOrderCount, salesAmount, totalSalesAmount] = groupCount.map(item => item ?? 0)
    const salesList = this.transformStatic(now, orders)
    const userList = this.transformStatic(now, users)
    return {
      updatedAt: nowStr,
      salesAmount,
      totalSalesAmount,
      orderCount,
      totalOrderCount,
      userCount,
      totalUserCount,
      salesList,
      userList
    }
  }
}
