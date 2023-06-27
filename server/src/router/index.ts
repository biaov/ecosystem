import { Router } from 'express'
import { userList, userDetail, userLogin } from '@/controller/user'

export const router = Router()

/**
 * 用户操作
 */
router.get('/user', userList)
router.get('/user/:id', userDetail)
router.post('/login', userLogin)
