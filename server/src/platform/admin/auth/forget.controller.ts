import { EmailService } from '@/platform/common/email/email.service'
import { ForgetService } from './forget.service'
import { ForgetDto } from './auto.dto'

@Controller('forget')
export class ForgetController {
  constructor(
    private readonly forgetService: ForgetService,
    private readonly emailService: EmailService
  ) {}

  @Post()
  @Log('授权/注册', '注册用户', 'nickname')
  async forget(@Body() { username, password, cpassword, code }: ForgetDto) {
    if (password !== cpassword) throw new BizException('两次密码输入不一致')
    await this.emailService.verify(username, code)
    return await this.forgetService.forget(username, password)
  }
}
