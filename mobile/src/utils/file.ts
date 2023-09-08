import { uploadImgApi } from '@/api/common'
import { toast } from './function'
import type { ChooseImageSuccessCallbackResult, UploadImgResult } from './types'

/**
 * 上传图片
 * @example
 * ```ts
 * import { uploadImg } from '@/utils/function'
 *
 * const chooseImage = async () => {
 *   const { url } = await uploadImg()
 *   console.log(url) // http://xxx/xx.png
 * }
 * chooseImage()
 * ```
 */
export const uploadImg = <T extends UploadImgResult>(): Promise<T> => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: async data => {
        const { tempFiles, tempFilePaths } = data as ChooseImageSuccessCallbackResult
        const { size } = tempFiles[0]
        const [url] = tempFilePaths
        if (size > 1024 * 1024 * 1) {
          toast('图片大小不能超过1M')
          return
        }
        uploadImgApi
          .file<T>({ url })
          .then(resolve)
          .catch(error => {
            toast('上传失败')
            reject(error)
          })
      }
    })
  })
}
