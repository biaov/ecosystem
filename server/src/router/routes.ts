import { getUsers, getUserDetail, userLogin, userRegister, editPwd, updateUserDetail, deleteUser, resetUserPwd, createUser } from '@/controller/user'
import { getRoles, getRolesDetail, createRole, updateRole, deleteRole } from '@/controller/role'
import { getLogs } from '@/controller/log'
import type { RouteItem } from './types'

/**
 * 路由配置项
 */
export const routes: RouteItem[] = [
  /* 用户操作 */
  {
    title: '用户列表',
    path: '/user',
    method: 'get',
    controller: getUsers
  },
  {
    title: '创建用户',
    path: '/user',
    method: 'post',
    controller: createUser,
    permission: '/setting/account/add'
  },
  {
    title: '用户详情',
    path: '/user/:id',
    method: 'get',
    controller: getUserDetail
  },
  {
    title: '修改用户信息',
    path: '/user/:id',
    method: 'patch',
    controller: updateUserDetail,
    permission: '/setting/account/edit'
  },
  {
    title: '删除用户',
    path: '/user/:id',
    method: 'delete',
    controller: deleteUser,
    permission: '/setting/account/delete'
  },
  {
    title: '重置用户密码',
    path: '/user/:id/reset-password',
    method: 'post',
    controller: resetUserPwd,
    permission: '/setting/account/reset-pwd'
  },
  /* 授权操作 */
  {
    title: '修改密码',
    path: '/edit-password',
    method: 'post',
    controller: editPwd,
    permission: '/setting/account/edit-pwd'
  },
  {
    title: '用户登录',
    path: '/login',
    method: 'post',
    token: false,
    controller: userLogin
  },
  {
    title: '用户注册',
    path: '/register',
    method: 'post',
    token: false,
    controller: userRegister
  },
  /* 角色操作 */
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
    method: 'patch',
    controller: updateRole,
    permission: '/setting/role/edit'
  },
  {
    title: '删除角色',
    path: '/role/:id',
    method: 'patch',
    controller: deleteRole,
    permission: '/setting/role/delete'
  },
  /* 操作日志 */
  {
    title: '日志列表',
    path: '/log',
    method: 'get',
    controller: getLogs
  }
]
