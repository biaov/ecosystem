import { EmailService } from '@/platform/common/email/email.service'
import { RegisterService } from './register.service'
import { RegisterDto } from './auto.dto'

@Controller('register')
export class RegisterController {
  constructor(
    private readonly userService: RegisterService,
    private readonly emailService: EmailService
  ) {}

  @Post()
  @Log('授权/注册', '注册用户', 'nickname')
  async register(@Body() { username, password, cpassword, code, source }: RegisterDto) {
    if (password !== cpassword) throw new BizException('两次密码输入不一致')
    await this.emailService.verify(username, code)
    return await this.userService.register(username, password, source)
  }
}
