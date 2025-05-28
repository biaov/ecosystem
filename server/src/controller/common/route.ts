import type { RouteItem } from '@/router/types'
import { uploadImg, silentAuth,offiaccount } from './hooks'

/**
 * 通用的
 */
const routes: RouteItem[] = [
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
  {
    title: '公众号',
    path: '/wx',
    method: 'get',
    controller: offiaccount,
    token: false
  }
]

export default routes
