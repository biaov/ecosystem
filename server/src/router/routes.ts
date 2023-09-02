import { uploadImg, silentAuth } from '@/controller/common'
import { getUsers, getUserDetail, userLogin, userRegister, editPwd, updateUserDetail, deleteUser, resetUserPwd, createUser } from '@/controller/user'
import { getRoles, getRolesDetail, createRole, updateRole, deleteRole } from '@/controller/role'
import {
  getSwiper,
  createSwiper,
  updateSwiper,
  deleteSwiper,
  getNotice,
  getNoticeDetail,
  createNotice,
  updateNotice,
  deleteNotice,
  getRecommend,
  getRecommendDetail,
  createRecommend,
  updateRecommend,
  deleteRecommend,
  getFeature,
  createFeature,
  updateFeature,
  deleteFeature
} from '@/controller/manage'
import { getLogs } from '@/controller/log'
import type { RouteItem } from './types'

/**
 * 路由配置项
 */
export const routes: RouteItem[] = [
  /* 通用的 */
  {
    title: '上传图片',
    path: '/upload-img',
    method: 'post',
    controller: uploadImg,
    upload: true
  },
  {
    title: '静默授权',
    path: '/silent-auth',
    method: 'get',
    controller: silentAuth,
    token: false
  },
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
  },
  /* 管理 */
  {
    title: '轮播列表',
    path: '/manage/swiper',
    method: 'get',
    controller: getSwiper
  },
  {
    title: '新增轮播',
    path: '/manage/swiper',
    method: 'post',
    controller: createSwiper,
    permission: '/manage/swiper/add'
  },
  {
    title: '编辑轮播',
    path: '/manage/swiper/:id',
    method: 'patch',
    controller: updateSwiper,
    permission: '/manage/swiper/edit'
  },
  {
    title: '删除轮播',
    path: '/manage/swiper/:id',
    method: 'delete',
    controller: deleteSwiper,
    permission: '/manage/swiper/delete'
  },
  {
    title: '公告列表',
    path: '/manage/notice',
    method: 'get',
    controller: getNotice
  },
  {
    title: '公告详情',
    path: '/manage/notice/:id',
    method: 'get',
    controller: getNoticeDetail
  },
  {
    title: '新增公告',
    path: '/manage/notice',
    method: 'post',
    controller: createNotice,
    permission: '/manage/notice/add'
  },
  {
    title: '编辑公告',
    path: '/manage/notice/:id',
    method: 'patch',
    controller: updateNotice,
    permission: '/manage/notice/edit'
  },
  {
    title: '删除公告',
    path: '/manage/notice/:id',
    method: 'delete',
    controller: deleteNotice,
    permission: '/manage/notice/delete'
  },
  {
    title: '推荐列表',
    path: '/manage/recommend',
    method: 'get',
    controller: getRecommend
  },
  {
    title: '推荐详情',
    path: '/manage/recommend/:id',
    method: 'get',
    controller: getRecommendDetail
  },
  {
    title: '新增推荐',
    path: '/manage/recommend',
    method: 'post',
    controller: createRecommend,
    permission: '/manage/recommend/add'
  },
  {
    title: '编辑推荐',
    path: '/manage/recommend/:id',
    method: 'patch',
    controller: updateRecommend,
    permission: '/manage/recommend/edit'
  },
  {
    title: '删除推荐',
    path: '/manage/recommend/:id',
    method: 'delete',
    controller: deleteRecommend,
    permission: '/manage/recommend/delete'
  },
  {
    title: '功能列表',
    path: '/manage/feature',
    method: 'get',
    controller: getFeature
  },
  {
    title: '新增功能',
    path: '/manage/feature',
    method: 'post',
    controller: createFeature,
    permission: '/manage/feature/add'
  },
  {
    title: '编辑功能',
    path: '/manage/feature/:id',
    method: 'patch',
    controller: updateFeature,
    permission: '/manage/feature/edit'
  },
  {
    title: '删除功能',
    path: '/manage/feature/:id',
    method: 'delete',
    controller: deleteFeature,
    permission: '/manage/feature/delete'
  }
]
