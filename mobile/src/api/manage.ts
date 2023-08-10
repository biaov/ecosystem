import { restful } from './factory'

/**
 * 轮播列表
 */
export const swiperApi = restful('/manage/swiper')

/**
 * 公告列表
 */
export const noticeApi = restful('/manage/notice')

/**
 * 热点推荐
 */
export const recommendApi = restful('/manage/recommend')

/**
 * 功能列表
 */
export const featureApi = restful('/manage/feature')
