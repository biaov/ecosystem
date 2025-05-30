import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// 错误拦截器
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse()
    const code = exception.getStatus()
    response.status(code).json({ code, message: exception.message })
  }
}

// 成功拦截器
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler
  ): Observable<{
    code: number
    message: string
    data: unknown
  }> {
    return next.handle().pipe(
      map(data => {
        return {
          code: 200,
          message: '',
          data
        }
      })
    )
  }
}
