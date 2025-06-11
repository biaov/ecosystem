import { CanActivate, ExecutionContext } from '@nestjs/common'

/**
 * token 服务
 * 用于验证 token 和生成 token
 */
@Injectable()
export class TokenService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  async verify(context: ExecutionContext, type: 'user' | 'admin' = 'user'): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    if (!authorization) throw new BizException('未登录', HttpStatus.UNAUTHORIZED)
    const token = authorization.split(' ')[1]
    if (!token) throw new BizException('未登录', HttpStatus.UNAUTHORIZED)
    let payload: TokenValue
    try {
      payload = jwt.verify(token, import.meta.env.VITE_JWT_SECRET)
    } catch (error) {
      const msg = (error as Error).message.includes('expired') ? 'token 已过期' : 'token 错误'
      throw new BizException(msg, HttpStatus.UNAUTHORIZED)
    }
    if (!payload?.userId) throw new BizException('未登录或登录已过期', HttpStatus.UNAUTHORIZED)
    const userExist = await this[type === 'admin' ? 'userAdminRepository' : 'userRepository'].findOneBy({ id: +payload.userId })
    if (!userExist) throw new BizException('用户不存在', HttpStatus.UNAUTHORIZED)
    return true
  }

  getToken(data: TokenValue) {
    return jwt.sign(data, import.meta.env.VITE_JWT_SECRET, { expiresIn: '24h' })
  }
}

/**
 * 授权守卫
 * token 校验守卫
 * 用于前端用户
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(context: ExecutionContext) {
    return this.tokenService.verify(context)
  }
}

/**
 * 授权守卫
 * token 校验守卫
 * 用于控制台用户
 */
@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(context: ExecutionContext) {
    return this.tokenService.verify(context, 'admin')
  }
}
