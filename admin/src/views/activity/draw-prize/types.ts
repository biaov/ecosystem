import type { ActivityStatus } from '@/enums/types'

/**
 * 活动数据
 */
export interface DataType {
  id: number
  name: string
  startTime: string
  endTime: string
  status: ActivityStatus.Status
  desc: string
  createdAt: string
}

/**
 * 数据记录
 */
export interface DataRecordType {
  id: number
  activityId: number
  username: number
  phoneNumber: number
  deviceId: number
  prizeName: string
}

/**
 * 规则
 */
export interface RuleItem {
  name: string
  prizeName: string
  stock: number
}
