import { Router } from 'express'
import { verifyToken, verifyPermission } from '@/middleware'
import { routes } from './routes'

export const router = Router()

routes.forEach(({ method, path, controller, token, permission }) => {
  if (token === false) {
    router[method](path, controller)
  } else if (permission) {
    router[method](path, verifyToken, verifyPermission(permission), controller)
  } else {
    router[method](path, verifyToken, controller)
  }
})
