import type { Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { maxFileSize, domainName, uploadDir } from '@/config'
import crypto from 'crypto'

const { sign, verify } = jsonwebtoken

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
      res.success({ url: domainName + uploadDir + filename })
    }
  } else {
    res.status(422).error('文件不存在')
  }
}

/**
 * 静默授权
 */
export const silentAuth = async (req: Request, res: Response) => {
  const oldToken = req.headers.authorization?.slice(7)
  let userId = 0
  if (oldToken) {
    const oldTokenResult = verify(oldToken, 'secret') as JwtPayload
    userId = oldTokenResult.userId
  }
  const token = sign({ userId }, 'secret', { expiresIn: '24h' })
  res.success({ token })
}

export const offiaccount = async (req: Request, res: Response) => {
  // 加密方法
  function sha1(str: string) {
    const md5sum = crypto.createHash('sha1')
    md5sum.update(str)
    str = md5sum.digest('hex')
    return str
  }

  const { signature, echostr, timestamp, nonce } = req.query
  const oriArray = [nonce, timestamp, 'biaov001']
  oriArray.sort()
  const original = oriArray.join('')
  let scyptoString = sha1(original)
  if (signature == scyptoString) {
    res.send(echostr)
  } else {
    res.send(false)
  }
}
