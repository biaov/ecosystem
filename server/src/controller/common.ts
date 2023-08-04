import type { Request, Response } from 'express'
import { maxFileSize, domainName, fileDir } from '@/config'

/**
 * 上传图片
 * 这里因为是少量内存小的图片，所以直接上传到服务器
 * 如果是大文件，可以考虑直传到云存储，然后返回云存储的地址
 */
export const uploadImg = async (req: Request, res: Response) => {
  if (req.file) {
    const { filename, size } = req.file
    if (size > maxFileSize) {
      res.status(422).error('文件过大，请上传不超过1M的图片')
    } else {
      res.success({ url: domainName + fileDir + filename })
    }
  } else {
    res.status(422).error('文件不存在')
  }
}
