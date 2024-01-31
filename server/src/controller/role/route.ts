import type { RouteItem } from '@/router/types'
import { getRoles, getRolesDetail, createRole, updateRole, deleteRole } from './hooks'

/**
 * 角色操作
 */
const routes: RouteItem[] = [
  {
    title: '角色列表',
    path: '/role',
    method: 'get',
    controller: getRoles
  },
  {
    title: '角色详情',
    path: '/role/:id',
    method: 'get',
    controller: getRolesDetail
  },
  {
    title: '创建角色',
    path: '/role',
    method: 'post',
    controller: createRole,
    permission: '/setting/role/add'
  },
  {
    title: '修改角色信息',
    path: '/role/:id',
    method: 'put',
    controller: updateRole,
    permission: '/setting/role/edit'
  },
  {
    title: '删除角色',
    path: '/role/:id',
    method: 'put',
    controller: deleteRole,
    permission: '/setting/role/delete'
  }
]

export default routes
