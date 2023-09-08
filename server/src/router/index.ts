import path from 'path'
import { Router } from 'express'
import multer from 'multer'
import { verifyToken, verifyPermission } from '@/middleware'
import { uploadDir } from '@/config'
import { randomId } from '@/utils/function'
import { routes } from './routes'

export const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/${uploadDir}`)
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, randomId() + extname)
  }
})

const uploadMulter = multer({ storage })

routes.forEach(({ method, path, controller, token, permission, upload }) => {
  if (token === false) {
    /**
     * 不需要 token 验证的路由
     */
    router[method](path, controller)
  } else if (permission) {
    /**
     * 需要 token 验证和权限验证的路由
     */
    router[method](path, verifyToken, verifyPermission(permission), controller)
  } else if (upload) {
    /**
     * 需要 token 验证和上传文件的路由
     */
    router[method](path, verifyToken, uploadMulter.single('file'), controller)
  } else {
    /**
     * 需要 token 验证的路由
     */
    router[method](path, verifyToken, controller)
  }
})
