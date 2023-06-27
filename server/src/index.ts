/// <reference path="./module.d.ts" />
import express from 'express'
import { router } from '@/router'
import { baseURL, port } from '@/config'
import { jsonResponse, jsonBodyParser } from '@/middleware'

export const app = express()

app.use(jsonResponse)
app.use(jsonBodyParser)
app.use(baseURL, router)

import.meta.env.PROD && app.listen(port)
