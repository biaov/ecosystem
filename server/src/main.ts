import { AppModule } from './app.module'
import { HttpErrorFilter } from './http.interceptor'
import { TransfromPipe } from './transfrom.pipe'

export const app = await NestFactory.create(AppModule)

app.setGlobalPrefix('api')

app.useGlobalPipes(
  new TransfromPipe(),
  new ValidationPipe({
    transform: false, // 自动转换 DTO 中的类型
    whitelist: true, // 自动过滤掉 DTO 中未定义的属性
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // 错误状态码改为 422
    stopAtFirstError: true, // 第一次错误就停止
    exceptionFactory: errors => new UnprocessableEntityException(Object.values(errors[0].constraints!)[0]) // 格式化错误信息
  })
)
app.useGlobalFilters(new HttpErrorFilter()) // 错误过滤器
// app.enableCors() // 启用 CORS

import.meta.env.PROD && app.listen(import.meta.env.VITE_PORT)
