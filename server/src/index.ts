/// <reference path="./module.d.ts" />
import express from 'express'
import { router } from '@/router'
import { jsonResponse, jsonBodyParser } from '@/middleware'
import { baseURL, port } from '@/config'
import '@/database/migrations'

export const app = express()

app.use(jsonResponse)
app.use(jsonBodyParser)
app.use(baseURL, router)

if (import.meta.env.PROD) {
  app.listen(port)
} else {
  app.use('/uploads', express.static('uploads'))
}
