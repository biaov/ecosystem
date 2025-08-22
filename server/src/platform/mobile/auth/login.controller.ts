import { TokenService } from '@/platform/common/token/token.service'
import { CaptchaService } from '@/platform/common/captcha/captcha.service'
import { LoginService } from './login.service'
import { LoginDto, MobileLoginDto } from './auto.dto'

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly captchaService: CaptchaService,
    private readonly tokenService: TokenService
  ) {}

  async codeValidator(code: { id: string; value: string }) {
    const { id, value } = code
    if (!(await this.captchaService.verify(id, value))) return
    return true
  }

  async getToken<T extends Promise<Record<string, any>>>(data: T) {
    const result = await data
    const token = this.tokenService.getToken({ userId: result.id })
    return { ...result, token }
  }

  @Post()
  login(@Body() { username, password }: LoginDto) {
    return this.getToken(this.loginService.login(username, password))
  }
  @Post('mobile')
  async mobileLogin(@Body() { username, code }: MobileLoginDto) {
    if (!validator.mobile(username)) return
    if (!(await this.codeValidator(code))) return
    return await this.getToken(this.loginService.mobileLogin(username))
  }
}
