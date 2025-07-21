import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

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
  @InjectRepository(UserRoleModel)
  private userRoleRepository: Repository<UserRoleModel>

  async getPayload(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    let { token } = request.query
    const { authorization } = request.headers
    // token 校验
    if (!authorization && !token) throw new BizException('未登录', HttpStatus.UNAUTHORIZED)
    !token && (token = authorization.split(' ')[1])
    if (!token) throw new BizException('未登录', HttpStatus.UNAUTHORIZED)
    let payload: TokenValue
    try {
      payload = jwt.verify(token, import.meta.env.VITE_JWT_SECRET)
    } catch (error) {
      throw new BizException((error as Error).message.includes('expired') ? 'token 已过期' : 'token 错误', HttpStatus.UNAUTHORIZED)
    }

    // 用户校验
    if (!payload?.userId) throw new BizException('未登录或登录已过期', HttpStatus.UNAUTHORIZED)

    return { userId: +payload.userId }
  }

  async verify(context: ExecutionContext, type: 'user' | 'admin' | 'all' = 'user', permission?: string): Promise<boolean> {
    const payload = await this.getPayload(context)
    // 所有用户都可以访问
    if (type === 'all') return true
    const userExist = await this[type === 'admin' ? 'userAdminRepository' : 'userRepository'].findOneBy({ id: payload.userId })
    if (!userExist) throw new BizException('用户不存在', HttpStatus.UNAUTHORIZED)

    // 权限校验
    if (permission && type === 'admin') {
      const role = await this.userRoleRepository.findOneBy({ id: (userExist as UserAdminModel).roleId })
      if (!role) throw new BizException('用户角色不存在')
      if (!role.permissions.includes('*') && !role.permissions.includes(permission)) throw new BizException('权限不足', HttpStatus.FORBIDDEN)
    }

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
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService
  ) {}

  canActivate(context: ExecutionContext) {
    const permission = this.reflector.get<string>(MetaKeyEnum.permission, context.getHandler())
    return this.tokenService.verify(context, 'admin', permission)
  }
}

/**
 * 授权守卫
 * token 校验守卫
 * 用于控制台或者前端用户
 */
@Injectable()
export class AuthGuardAll implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(context: ExecutionContext) {
    return this.tokenService.verify(context, 'all')
  }
}

/**
 * 日志
 * 用于控制台用户
 */
@Injectable()
export class LogGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService
  ) {}

  canActivate(context: ExecutionContext) {
    const logInfo = this.reflector.getAllAndOverride<string>(MetaKeyEnum.log, [context.getHandler(), context.getClass()])
    // return this.tokenService.verify(context, 'admin', permission)
    console.log(logInfo)
    return true
  }
}
