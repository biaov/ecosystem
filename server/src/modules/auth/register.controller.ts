import { CaptchaValidator } from '@/validator/captcha'
import { RegisterService } from './register.service'
import { RegisterDto } from './auto.dto'

@Controller('register')
export class RegisterController {
  @InjectRedis()
  private readonly redis: Redis
  private readonly userService: RegisterService
  private readonly captchaValidator: CaptchaValidator

  @Post()
  register(@Body() { username, password, cpassword, code }: RegisterDto) {
    if (password !== cpassword) throw new BizException('两次密码输入不一致')
    const { id, value } = code
    if (!this.captchaValidator.verify(id, value)) return
    return this.userService.register(username, password)
  }
  @Post('admin')
  adminRegister(@Body() { username, password, cpassword, code }: RegisterDto) {
    return this.userService.adminRegister(username, password)
  }
}
