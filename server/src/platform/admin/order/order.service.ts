import { OrderModel } from '@/models/order'

type ListOption = {
  sn?: string
  nickname?: string
  mobile?: string
  sku?: string
  name?: string
  status?: string
  type?: string
  source?: string
}

@Injectable()
export class OrderService {
  @InjectRepository(OrderModel)
  private orderRepository: Repository<OrderModel>
  @InjectRepository(OrderTraceModel)
  private orderTraceRepository: Repository<OrderTraceModel>
  list({ skip, take, current, pageSize }: PageOption, { sn, nickname, mobile, sku, name, status, type, source }: ListOption) {
    return findAndCount(
      this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'items')
        .leftJoinAndSelect('order.user', 'user')
        .where(useTransfrormQuery({ sn, status, type, source }, { sn: 'like' }))
        .andWhere(
          ...useTransfrormQuery<[string, {}]>(
            {
              'user.nickname': nickname,
              'user.mobile': mobile,
              'items.sku': sku,
              'items.goodsName': name
            },
            {
              'user.nickname': 'like',
              'user.mobile': 'like',
              'items.sku': 'like',
              'items.goodsName': 'like'
            }
          )
        )
        .take(take)
        .skip(skip)
        .orderBy('order.createdAt', 'DESC')
        .getManyAndCount(),
      { current, pageSize }
    )
  }
  detail(id: number) {
    return this.orderRepository.findOne({ where: { id }, relations: ['user', 'items', 'invoice', 'trace'] })
  }
  async updateShipped(id: number, { expressCode, expressSn }: { expressCode: string; expressSn: string }) {
    /**
     * 有条件: 同步第三方物流
     * 这里为演示数据
     */
    const traces = [
      {
        date: dayjs().add(2, 'd').format('YYYY-MM-DD HH:mm:ss'),
        message: '待收货'
      },
      {
        date: dayjs().add(1, 'd').format('YYYY-MM-DD HH:mm:ss'),
        message: '运输中'
      },
      {
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '已发货'
      }
    ]

    await this.orderTraceRepository.save({ orderId: id, expressCode, expressSn, traces })
    return useAffected(this.orderRepository.update(id, { status: OrderStatusEnum.shipped }))
  }
}

@Injectable()
export class CreditOrderService {
  @InjectRepository(CreditOrderModel)
  private creditOrderRepository: Repository<CreditOrderModel>
  @InjectRepository(OrderTraceModel)
  private orderTraceRepository: Repository<OrderTraceModel>
  list({ skip, take, current, pageSize }: PageOption, { sn, nickname, mobile, sku, name, status, type, source }: ListOption) {
    return findAndCount(
      this.creditOrderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'items')
        .leftJoinAndSelect('order.user', 'user')
        .where(useTransfrormQuery({ sn, status, type, source }, { sn: 'like' }))
        .andWhere(
          ...useTransfrormQuery<[string, {}]>(
            {
              'user.nickname': nickname,
              'user.mobile': mobile,
              'items.sku': sku,
              'items.goodsName': name
            },
            {
              'user.nickname': 'like',
              'user.mobile': 'like',
              'items.sku': 'like',
              'items.goodsName': 'like'
            }
          )
        )
        .take(take)
        .skip(skip)
        .orderBy('order.createdAt', 'DESC')
        .getManyAndCount(),
      { current, pageSize }
    )
  }
  detail(id: number) {
    return this.creditOrderRepository.findOne({ where: { id }, relations: ['user', 'items', 'invoice', 'trace'] })
  }
  async updateShipped(id: number, { expressCode, expressSn }: { expressCode: string; expressSn: string }) {
    /**
     * 有条件: 同步第三方物流
     * 这里为演示数据
     */
    const traces = [
      {
        date: dayjs().add(2, 'd').format('YYYY-MM-DD HH:mm:ss'),
        message: '待收货'
      },
      {
        date: dayjs().add(1, 'd').format('YYYY-MM-DD HH:mm:ss'),
        message: '运输中'
      },
      {
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        message: '已发货'
      }
    ]

    await this.orderTraceRepository.save({ orderId: id, expressCode, expressSn, traces })
    return useAffected(this.creditOrderRepository.update(id, { status: OrderStatusEnum.shipped }))
  }
}
