/**
 * responsive-swiper 组件类型定义
 */
export namespace ResponsiveSwiper {
  export interface ListItem extends Record<string, unknown> {
    [key: string]: unknown
    url: string
  }

  export interface Props {
    list?: ListItem[]
  }

  export interface ChangeProps {
    detail: { current: number }
  }
}

/**
 * svg-img 组件类型定义
 */
export namespace SvgImg {
  export interface Props {
    src: string
    colors?: string[]
    mode?: string
    width?: string
    height?: string
  }
}

/**
 * loading-more 组件类型定义
 */
export namespace LoadingMore {
  export interface Props {
    status?: 'loadMore' | 'loading' | 'noMore'
    loadingText?: string[]
  }
}

/**
 * 公告
 */
export namespace NoticeList {
  export interface ListItem {
    id: number
    title: string
    pageUrl: string
    content: string
  }
}
