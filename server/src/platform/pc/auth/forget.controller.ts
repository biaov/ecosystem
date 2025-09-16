import { CaptchaService } from '@/platform/common/captcha/captcha.service'
import { LogService } from '@/platform/admin/log/log.service'
import { ForgetService } from './forget.service'
import { ForgetDto } from './auto.dto'

@Controller('forget')
export class ForgetController {
  constructor(
    private readonly userService: ForgetService,
    private readonly captchaService: CaptchaService,
    private readonly logService: LogService
  ) {}

  async forgetValidator(password, cpassword, code: { id: string; value: string }) {
    if (password !== cpassword) throw new BizException('两次密码输入不一致')
    const { id, value } = code
    if (!(await this.captchaService.verify(id, value))) return
    return true
  }

  @Post()
  async forget(@Ip() ip: string, @Body() { username, password, cpassword, code }: ForgetDto) {
    if (!(await this.forgetValidator(password, cpassword, code))) return
    return await this.userService.forget(username, password)
  }
}
