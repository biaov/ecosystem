import { CaptchaService } from '@/platform/common/captcha/captcha.service'
import { LogService } from '@/platform/admin/log/log.service'
import { RegisterService } from './register.service'
import { RegisterDto } from './auto.dto'

@Controller('register')
export class RegisterController {
  constructor(
    private readonly userService: RegisterService,
    private readonly captchaService: CaptchaService,
    private readonly logService: LogService
  ) {}

  async registerValidator(password, cpassword, code: { id: string; value: string }) {
    if (password !== cpassword) throw new BizException('两次密码输入不一致')
    const { id, value } = code
    if (!(await this.captchaService.verify(id, value))) return
    return true
  }

  @Post()
  @Log('授权/注册', '注册用户', 'nickname')
  async register(@Ip() ip: string, @Body() { username, password, cpassword, code, source }: RegisterDto) {
    if (!(await this.registerValidator(password, cpassword, code))) return
    return await this.userService.register(username, password, source)
  }
}
