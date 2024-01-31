import dayjs from 'dayjs'
import { Op } from 'sequelize'
import { ActivityStatus } from './types'

/**
 * 活动状态
 */
export const activityStatus = {
  /**
   * 未开始
   */
  noStart: 'noStart',

  /**
   * 进行中
   */
  normal: 'normal',

  /**
   * 已结束
   */
  ended: 'ended',

  options(): ActivityStatus.Option[] {
    return [
      { label: '未开始', value: this.noStart },
      { label: '进行中', value: this.normal },
      { label: '已结束', value: this.ended }
    ]
  },
  filter(value: string) {
    return this.options().find(item => item.value === value)!
  },
  format({ startTime, endTime, status }: ActivityStatus.FormatOption) {
    const now = dayjs()
    if (status) {
      const nowFormat = now.format('YYYY-MM-DD HH:mm:ss')
      const ltWhere = { [Op.lt]: nowFormat }
      const gtWhere = { [Op.gt]: nowFormat }
      switch (status) {
        case this.noStart:
          return { startTime: gtWhere }
        case this.normal:
          return { startTime: ltWhere, endTime: gtWhere }
        case this.ended:
          return { endTime: ltWhere }
        default:
          return {}
      }
    } else {
      const before = +dayjs(startTime)
      const after = +dayjs(endTime)
      if (+now < before) return this.noStart
      else if (+now > after) return this.ended
      else return this.normal
    }
  }
}
