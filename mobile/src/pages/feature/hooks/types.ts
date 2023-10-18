import type { Ref } from 'vue'

/**
 * 绘制海报
 */
export namespace DrawPoster {
  export interface ShareData {
    selectImgUrl: Ref<string>
  }

  export interface DrawImgsItem {
    type: 'image' | 'text'
    url?: string
    x: number
    y: number
    width?: number
    height?: number
    text?: string
    fontSize?: number
    color?: string
    textAlign?: 'left' | 'center' | 'right'
    downTemp?: UniApp.DownloadSuccessData
  }
}
