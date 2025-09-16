import { TokenService } from '@/platform/common/token/token.service'
import { EmailService } from '@/platform/common/email/email.service'
import { LoginService } from './login.service'
import { LoginDto } from './auto.dto'

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService
  ) {}

  private async getToken<T extends Promise<Record<string, any>>>(data: T) {
    const result = await data
    const token = this.tokenService.getToken({ userId: result.id })
    return { ...result, token }
  }
  @Log('授权/登录', '登录系统', 'nickname')
  @Post()
  async login(@Body() { username, password, type, code }: LoginDto) {
    let result
    if (type === AuthType.email) {
      if (!validator.email(username)) return
      await this.emailService.verify(username, code!)
      result = await this.getToken(this.loginService.codeLogin(username))
    } else if (type === AuthType.password) {
      result = await this.getToken(this.loginService.login(username, password!))
    }

    return result
  }
}
