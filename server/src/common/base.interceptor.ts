import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { LogService } from '@/platform/admin/log/log.service'
import { TokenService } from '@/platform/common/token/token.service'
import { Reflector } from '@nestjs/core'

/**
 * 错误拦截器
 */
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse()
    const code = exception.getStatus()
    response.status(code).json({ code, message: exception.message })
  }
}

/**
 * 成功拦截器
 */
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

/**
 * 日志拦截器
 */
@Injectable()
export class LogInterceptor implements NestInterceptor {
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>
  constructor(
    private readonly logService: LogService,
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logInfo = this.reflector.get<{ module: string; content: string; field?: string } | undefined>(MetaKeyEnum.log, context.getHandler())
    if (!logInfo) return next.handle()
    const { ip } = context.switchToHttp().getRequest()
    return next.handle().pipe(
      tap(async res => {
        let nickname: string
        let { module, content, field } = logInfo
        if (field) {
          nickname = res[field]
        } else {
          try {
            const payload = await this.tokenService.getPayload(context)
            const userInfo = await this.userAdminRepository.findOneBy({ id: payload.userId })
            nickname = userInfo?.nickname || '未知'
          } catch {
            nickname = '未知'
          }
        }
        content = content.replace(/\[\w+\]/g, (val: string) => res[val.slice(1, -1)] || '')
        this.logService.createOperation({ nickname, module, content, ip })
      })
    )
  }
}
