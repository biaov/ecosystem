import type { RouteItem } from '@/router/types'
import { getCase, getCaseDetail, createCase, updateCase, deleteCase } from './hooks'

/**
 * 案例
 */
const routes: RouteItem[] = [
  {
    title: '案例列表',
    path: '/case/more',
    method: 'get',
    controller: getCase
  },
  {
    title: '案例详情',
    path: '/case/more/:id',
    method: 'get',
    controller: getCaseDetail
  },
  {
    title: '新增案例',
    path: '/case/more',
    method: 'post',
    controller: createCase,
    permission: '/case/more/add'
  },
  {
    title: '编辑案例',
    path: '/case/more/:id',
    method: 'put',
    controller: updateCase,
    permission: '/case/more/edit'
  },
  {
    title: '删除案例',
    path: '/case/more/:id',
    method: 'delete',
    controller: deleteCase,
    permission: '/case/more/delete'
  }
]

export default routes
