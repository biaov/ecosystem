import type { RouteItem } from '@/router/types'
import { getLogs } from './hooks'

/**
 * 操作日志
 */
const routes: RouteItem[] = [
  {
    title: '日志列表',
    path: '/log',
    method: 'get',
    controller: getLogs
  }
]

export default routes
