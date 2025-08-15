@Injectable()
export class ActivityCouponService {
  @InjectRepository(ActivityCouponModel)
  private activityCouponRepository: Repository<ActivityCouponModel>

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

  @Cron('*/60 * * * * *')
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
      })
    )
  }
}
