import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

export const app = await NestFactory.create(AppModule)

app.setGlobalPrefix('api')

import.meta.env.PROD && app.listen(import.meta.env.VITE_PORT)
