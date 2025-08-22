import type { FindOptionsWhere } from 'typeorm'

const shippedWhere = { type: OrderTypeEnum.entity, status: OrderStatusEnum.shipped }

@Injectable()
export class ScheduleService {
  @InjectRepository(OrderModel)
  private orderRepository: Repository<OrderModel>

  @InjectRepository(CreditOrderModel)
  private creditOrderRepository: Repository<CreditOrderModel>

  @InjectRepository(SettingModel)
  private settingRepository: Repository<SettingModel>

  private async getSettingTime() {
    const orderSetting = await this.settingRepository.findOneBy({ key: SettingKeyEnum.order })
    const cancelTime = orderSetting?.value?.cancelTime
    const receiptTime = orderSetting?.value?.cancelTime
    if ((!cancelTime && cancelTime !== 0) || (!receiptTime && receiptTime !== 0)) return { cancelTime: 0 }
    return { cancelTime, receiptTime }
  }

  private async handleOrderResult<T extends OrderModel | CreditOrderModel>(repository: Repository<T>, where: FindOptionsWhere<{}>) {
    const { cancelTime, receiptTime } = await this.getSettingTime()
    if (!cancelTime) return
    const now = dayjs()
    const orders = await repository.findBy(where)
    if (!orders.length) return
    await Promise.all(
      orders.map(async order => {
        let flag = false
        switch (order.status) {
          case OrderStatusEnum.pay:
            const cancelAt = dayjs(order.createdAt).add(cancelTime, 'm')
            flag = now >= cancelAt
            break
          case OrderStatusEnum.shipped:
            const receiveAt = dayjs(order.shippedTime).add(receiptTime, 'd')
            flag = now >= receiveAt
            break
        }
        if (flag) await (repository as Repository<OrderModel | CreditOrderModel>).update(order.id, { status: OrderStatusEnum.cancelled })
      })
    )
  }

  @Cron('*/60 * * * * *')
  async handleOrderCron() {
    await this.handleOrderResult(this.orderRepository, [{ type: OrderTypeEnum.entity, status: OrderStatusEnum.pay }, shippedWhere])
  }

  @Cron('*/60 * * * * *')
  async handleCreditOrderCron() {
    await this.handleOrderResult(this.creditOrderRepository, shippedWhere)
  }
}
