import { toast } from '@/utils/function'
import { baseAssetURL } from '@/config/asset'
import type { DrawPoster } from './types'

/**
 * 图片选择
 */
export const useImgSelect = () => {
  /**
   * 图片列表
   */
  const imgList = ref(['thumbnail00.png', 'thumbnail01.png', 'thumbnail02.png', 'thumbnail03.png'].map(url => baseAssetURL + url))

  /**
   * 当前选中的图片
   */
  const imgIndex = ref(0)

  /**
   * 选中的图片地址
   */
  const selectImgUrl = computed(() => imgList.value[imgIndex.value])

  /**
   * 选择图片
   */
  const onSelectImg = (index: number) => {
    imgIndex.value = index
  }

  return { imgList, imgIndex, selectImgUrl, onSelectImg }
}

/**
 * 绘制海报
 */
export const useDrawPoster = ({ selectImgUrl }: DrawPoster.ShareData) => {
  const [visible, setVisible] = useVisible()

  /**
   * 海报预览地址
   */
  const previewUrl = ref('')

  /**
   * 海报尺寸
   */
  const rect = ref({ width: 640, height: 900 })

  /**
   * 当前组件实例
   */
  const that = getCurrentInstance()!.proxy!

  /**
   * 绘制海报
   */
  const onDrawPoster = async () => {
    try {
      uni.showLoading()
      const ctx = uni.createCanvasContext('posterCanvas', that)
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, rect.value.width, rect.value.height)
      const drawImgs: DrawPoster.DrawImgsItem[] = [
        {
          type: 'image',
          url: selectImgUrl.value,
          x: 0,
          y: 0,
          width: 640,
          height: 640
        },
        {
          type: 'image',
          url: `${baseAssetURL}h5-qrcode.png`,
          x: 225,
          y: 650,
          width: 192,
          height: 192
        },
        {
          type: 'text',
          text: '扫码二维码查看',
          x: 320,
          y: 870,
          fontSize: 24,
          color: '#494949',
          textAlign: 'center'
        }
      ]

      /**
       * 下载图片
       */
      const downTask = drawImgs.map(async item => {
        item.type === 'image' && (item.downTemp = await uni.downloadFile({ url: item.url! }))
        return item
      })
      const downResult = await Promise.all(downTask)
      if (downResult.some(item => item.type === 'image' && !item.downTemp)) throw new Error('下载图片失败')

      /**
       * 绘制图片
       */
      downResult.forEach(item => {
        switch (item.type) {
          case 'image':
            ctx.drawImage(item.downTemp!.tempFilePath, item.x, item.y, item.width!, item.height!)
            break
          case 'text':
            ctx.setFontSize(item.fontSize!)
            ctx.setFillStyle(item.color!)
            ctx.setTextAlign(item.textAlign!)
            ctx.fillText(item.text!, item.x, item.y)
            break
        }
      })
      ctx.draw(true, () => {
        uni.canvasToTempFilePath(
          {
            destWidth: rect.value.width,
            destHeight: rect.value.height,
            canvasId: 'posterCanvas',
            quality: 1,
            fileType: 'png',
            success: res => {
              previewUrl.value = res.tempFilePath
              setVisible(true)
              uni.hideLoading()
            },
            fail: () => {
              toast('绘制海报失败')
              uni.hideLoading()
            }
          },
          that
        )
      })
    } catch (error) {
      toast((error as string) || '绘制海报失败')
      uni.hideLoading()
    }
  }

  /**
   * 保存海报
   */
  const onSaveImg = () => {
    uni.saveImageToPhotosAlbum({
      filePath: previewUrl.value,
      success: () => {
        toast('保存成功')
      },
      fail: () => {
        toast('保存失败')
      }
    })
  }

  return { previewUrl, rect, visible, onDrawPoster, onSaveImg }
}
