import type { RouteItem } from '@/router/types'
import {
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityDetail,
  updateActivityRecord,
  updateActivityDraw,
  getActivityRecord,
  getActivityRecordDetail,
  getActivityRules
} from './hooks'

/**
 * 活动
 */
const routes: RouteItem[] = [
  {
    title: '活动列表',
    path: '/activity/draw-prize',
    method: 'get',
    controller: getActivity
  },
  {
    title: '创建活动',
    path: '/activity/draw-prize',
    method: 'post',
    controller: createActivity
  },
  {
    title: '修改活动',
    path: '/activity/draw-prize/:id',
    method: 'put',
    controller: updateActivity
  },
  {
    title: '删除活动',
    path: '/activity/draw-prize/:id',
    method: 'delete',
    controller: deleteActivity
  },
  {
    title: '活动详情',
    path: '/activity/draw-prize/:id',
    method: 'get',
    controller: getActivityDetail
  },
  {
    title: '更新活动记录',
    path: '/activity/draw-prize-record/:activityId',
    method: 'put',
    controller: updateActivityRecord
  },
  {
    title: '活动记录列表',
    path: '/activity/draw-prize-record',
    method: 'get',
    controller: getActivityRecord
  },
  {
    title: '活动记录详情',
    path: '/activity/draw-prize-record/:activityId',
    method: 'get',
    controller: getActivityRecordDetail
  },
  {
    title: '活动规则',
    path: '/activity/draw-prize-rules',
    method: 'get',
    controller: getActivityRules
  },
  {
    title: '活动抽奖',
    path: '/activity/draw-prize-draw',
    method: 'post',
    controller: updateActivityDraw
  }
]

export default routes
