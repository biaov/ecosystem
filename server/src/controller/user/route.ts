import type { RouteItem } from '@/router/types'
import { getUsers, getUserDetail, userLogin, userRegister, editPwd, updateUserDetail, deleteUser, resetUserPwd, createUser } from './hooks'

/**
 * 用户操作
 */
const routes: RouteItem[] = [
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
    method: 'put',
    controller: updateUserDetail,
    permission: '/setting/account/edit'
  },
  {
    title: '修改用户信息',
    path: '/user/:id',
    method: 'put',
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
  /**
   * 授权操作
   */
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
  }
]

export default routes
