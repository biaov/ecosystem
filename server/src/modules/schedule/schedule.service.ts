import { Cron, Interval } from '@nestjs/schedule'
import { LessThan } from 'typeorm'

@Injectable()
export class ScheduleService {
  @InjectRepository(ActivityCouponModel)
  private activityCouponRepository: Repository<ActivityCouponModel>

  @InjectRepository(OrderModel)
  private orderRepository: Repository<OrderModel>

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

  // @Cron('*/1 * * * *')
  @Interval(60000)
  async handleCron() {
    const now = dayjs()
    const nowLessThan = LessThan(now.toDate())
    const activities = await this.activityCouponRepository.find({
      where: [
        { startTime: nowLessThan, status: ActivityStatusEnum.notStart },
        { endTime: nowLessThan, status: ActivityStatusEnum.normal }
      ]
    })
    if (!activities.length) return
    await Promise.all(
      activities.map(async ({ id, startTime, endTime, status }) => {
        const start = dayjs(startTime)
        const end = dayjs(endTime)
        const newStatus = this.getStatus({ now, start, end })
        if (newStatus !== status) await this.activityCouponRepository.update(id, { status: newStatus })
        return { id, status }
      })
    )
  }
}
