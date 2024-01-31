import type { RouteItem } from '@/router/types'
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
} from './hooks'

/**
 * 管理
 */
const routes: RouteItem[] = [
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
    method: 'put',
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
    method: 'put',
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
    method: 'put',
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
    method: 'put',
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

export default routes
