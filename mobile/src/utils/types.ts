/**
 * 请求类型
 */
export type RequestType = 'request' | 'file'

/**
 * uni.chooseImage 的返回值
 */
export interface ChooseImageSuccessCallbackResult extends UniApp.ChooseImageSuccessCallbackResult {
  tempFiles: File[]
  tempFilePaths: string[]
}

/**
 * 上传图片的返回值
 */
export interface UploadImgResult extends Record<string, any> {
  url: string
}
