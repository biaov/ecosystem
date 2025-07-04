import { TokenService } from '@/platform/common/token/token.service'
import { CaptchaService } from '@/platform/common/captcha/captcha.service'
import { LogService } from '@/platform/admin/log/log.service'
import { LoginService } from './login.service'
import { LoginDto, MobileLoginDto } from './auto.dto'
import { Ip } from '@nestjs/common'

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly captchaService: CaptchaService,
    private readonly tokenService: TokenService,
    private readonly logService: LogService
  ) {}

  private async codeValidator(code: { id: string; value: string }) {
    const { id, value } = code
    if (!(await this.captchaService.verify(id, value))) return
    return true
  }

  private async getToken<T extends Promise<Record<string, any>>>(data: T) {
    const result = await data
    const token = this.tokenService.getToken({ userId: result.id })
    return { ...result, token }
  }
  @Post()
  async login(@Ip() ip: string, @Body() { username, password, type, code }: LoginDto & MobileLoginDto) {
    let result
    if (type === 'mobile') {
      if (!validator.mobile(username)) return
      if (!(await this.codeValidator(code))) return
      result = await this.getToken(this.loginService.mobileLogin(username))
    } else {
      result = await this.getToken(this.loginService.login(username, password))
    }

    await this.logService.createOperation({ nickname: result.nickname, module: '授权/登录', content: '登录系统', ip })
    return result
  }
}
