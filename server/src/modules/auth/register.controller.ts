import { CaptchaService } from '@/modules/common/captcha.service'
import { RegisterService } from './register.service'
import { RegisterDto } from './auto.dto'

@Controller('register')
export class RegisterController {
  constructor(
    private readonly userService: RegisterService,
    private readonly captchaService: CaptchaService
  ) {}

  async registerValidator(password, cpassword, code: { id: string; value: string }) {
    if (password !== cpassword) throw new BizException('两次密码输入不一致')
    const { id, value } = code
    if (!(await this.captchaService.verify(id, value))) return
    return true
  }

  @Post()
  async register(@Body() { username, password, cpassword, code }: RegisterDto) {
    if (!(await this.registerValidator(password, cpassword, code))) return
    return this.userService.register(username, password)
  }
  @Post('admin')
  async adminRegister(@Body() { username, password, cpassword, code }: RegisterDto) {
    if (!(await this.registerValidator(password, cpassword, code))) return
    return this.userService.adminRegister(username, password)
  }
}
