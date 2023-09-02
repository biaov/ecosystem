import { swiperApi, noticeApi, recommendApi } from '@/api/manage'
import type { SwiperList, NoticeList, RecommendList } from './types'

/**
 * 轮播图
 */
export const useSwiper = () => {
  const swiperList = ref<SwiperList.ListItem[]>([])

  const loadSwiperData = async () => {
    const { items } = await swiperApi.paging<SwiperList.ListItem>({ isShow: true, current: 1, pageSize: 6 })
    swiperList.value = items
  }

  const onClickSwiperItem = (item: SwiperList.ListItem) => {
    uni.navigateTo({ url: item.pageUrl })
  }

  return { swiperList, loadSwiperData, onClickSwiperItem }
}

/**
 * 公告
 */
export const useNotice = () => {
  const noticeList = ref<NoticeList.ListItem[]>([])

  const loadNoticeData = async () => {
    const { items } = await noticeApi.paging<NoticeList.ListItem>({ isShow: true, current: 1, pageSize: 5 })
    noticeList.value = items
  }

  const onClickNoticeItem = (item: NoticeList.ListItem) => {
    uni.navigateTo({ url: item.pageUrl })
  }

  return { noticeList, loadNoticeData, onClickNoticeItem }
}

/**
 * 热点推荐
 */
export const useRecommend = () => {
  const recommendList = ref<RecommendList.ListItem[]>([])

  const loadRecommendData = async () => {
    const { items } = await recommendApi.paging<RecommendList.ListItem>({ isShow: true, current: 1, pageSize: 20 })
    recommendList.value = items
  }

  const onClickRecommendItem = (item: RecommendList.ListItem) => {
    uni.navigateTo({ url: item.pageUrl })
  }

  return { recommendList, loadRecommendData, onClickRecommendItem }
}
