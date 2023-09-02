import { useStore } from '@/stores'
import { uploadImgApi } from '@/api/common'
import type { ChooseImageSuccessCallbackResult, UploadImgResult } from './types'

/**
 * 简易深拷贝
 * 当前项目够用
 * 如果需要支持更多类型，推荐使用 `lodash` 的 cloneDeep 方法
 * 或者其它方法
 */
export const cloneDeep = <T>(arg: T): T => JSON.parse(JSON.stringify(arg))

/**
 * 简易提示
 */
export const toast = (title: string) => {
  uni.showToast({
    title,
    mask: true,
    icon: 'none',
    duration: 2000
  })
}

/**
 * 校验登录
 */
export const validatorLogin = (isJump = true) => {
  const state = useStore()
  if (state.userInfo.id) return true
  isJump && uni.navigateTo({ url: '/pages/auth/login' })
  return false
}

/**
 * 上传图片
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
