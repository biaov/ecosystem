import { OrderModel } from '@/models/order'
import { ExamineTypeEnum } from './enums'

interface ListOption {
  sn?: string
  nickname?: string
  mobile?: string
  sku?: string
  name?: string
  status?: string
  type?: string
  source?: string
}

interface SaleListOption {
  sn?: string
  nickname?: string
  mobile?: string
  sku?: string
  name?: string
  status?: string
  type?: string
  orderSn?: string
}

interface UpdateExamineOption {
  type: string
  result?: string
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
              'items.giftName': name
            },
            {
              'user.nickname': 'like',
              'user.mobile': 'like',
              'items.sku': 'like',
              'items.giftName': 'like'
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
    return this.creditOrderRepository.findOne({ where: { id }, relations: ['user', 'items', 'trace'] })
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

@Injectable()
export class SaleOrderService {
  @InjectRepository(SaleOrderModel)
  private saleOrderRepository: Repository<SaleOrderModel>

  list({ skip, take, current, pageSize }: PageOption, { sn, nickname, mobile, sku, name, status, type, orderSn }: SaleListOption) {
    return findAndCount(
      this.saleOrderRepository
        .createQueryBuilder('saleOrder')
        .leftJoinAndSelect('saleOrder.order', 'order')
        .leftJoinAndSelect('order.items', 'items')
        .leftJoinAndSelect('saleOrder.user', 'user')
        .where(useTransfrormQuery({ sn, status, type }, { sn: 'like' }))
        .andWhere(
          ...useTransfrormQuery<[string, {}]>(
            {
              'user.nickname': nickname,
              'user.mobile': mobile,
              'order.sn': orderSn,
              'items.sku': sku,
              'items.goodsName': name
            },
            {
              'user.nickname': 'like',
              'user.mobile': 'like',
              'order.sn': 'like',
              'items.sku': 'like',
              'items.goodsName': 'like'
            }
          )
        )
        .take(take)
        .skip(skip)
        .orderBy('saleOrder.createdAt', 'DESC')
        .getManyAndCount(),
      { current, pageSize }
    )
  }
  detail(id: number) {
    return this.saleOrderRepository.findOne({ where: { id }, relations: ['user', 'order', 'trace', 'order.items'] })
  }
  async updateExamine(id: number, { type, result }: UpdateExamineOption) {
    const sale = await this.saleOrderRepository.findOneBy({ id })
    if (!sale) throw new BizException('售后订单不存在')
    let status: string

    if (type === ExamineTypeEnum.agree) {
      status = sale.type === SaleOrderTypeEnum.refund ? SaleOrderStatusEnum.refunding : SaleOrderStatusEnum.agreed
    } else {
      status = SaleOrderStatusEnum.rejected
      if (!result) throw new BizException('拒绝理由不能为空')
    }

    return useAffected(this.saleOrderRepository.update(id, { status, result }))
  }
  updateReceive(id: number) {
    return useAffected(this.saleOrderRepository.update(id, { status: SaleOrderStatusEnum.refunding }))
  }
  async updateRefund(id: number, { result, type }: UpdateExamineOption) {
    /**
     * 对接第三方退款，微信/支付宝/银行卡
     * 此处仅为演示，实际对接第三方接口
     */
    let status: string

    if (type === ExamineTypeEnum.agree) {
      status = SaleOrderStatusEnum.refunded
    } else {
      status = SaleOrderStatusEnum.rejected
      if (!result) throw new BizException('拒绝理由不能为空')
    }

    return useAffected(this.saleOrderRepository.update(id, { status, result }))
  }
}
