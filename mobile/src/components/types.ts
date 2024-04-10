/**
 * 默认插槽
 */
export interface DefaultSlots {
  default: (props: {}) => unknown
}

/**
 * responsive-swiper 组件
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
 * svg-img 组件
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
 * loading-more 组件
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

/**
 * view-mask 组件
 */
export namespace ViewMask {
  export interface Emits {
    (event: 'update:visible', e: boolean): void
  }
  export interface Props {
    /**
     * 显示状态
     */
    visible?: boolean

    /**
     * 背景颜色
     */
    background?: string

    /**
     * 禁止点击遮罩层关闭弹窗
     */
    disabled?: boolean
  }
}

/**
 * app-upgrador 组件
 */
export namespace AppUpgrador {
  interface Preset {
    cancelText: string
    okText: string
  }

  export interface ModalPreset {
    [key: string]: Preset | undefined
  }
}
