/// <reference path="./module.d.ts" />
import express from 'express'
import { router } from '@/router'
import { jsonResponse, jsonBodyParser } from '@/middleware'
import { baseURL, port } from '@/config'
import { sequelize } from '@/config/database'
import.meta.glob('@/model')

sequelize.sync()

export const app = express()

app.use(jsonResponse)
app.use(jsonBodyParser)
app.use(baseURL, router)

import.meta.env.PROD && app.listen(port)
