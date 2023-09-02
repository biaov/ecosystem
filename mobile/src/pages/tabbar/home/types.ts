/**
 * 轮播图
 */
export namespace SwiperList {
  export interface ListItem {
    id: number
    url: string
    pageUrl: string
  }
}


/**
 * 热点推荐
 */
export namespace RecommendList {
  export interface ListItem {
    id: number
    coverUrl: string
    title: string
    pageUrl: string
    createdAt: string
  }
}
