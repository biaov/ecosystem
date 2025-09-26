import { Headers } from '@nestjs/common'
import { EmailService } from '@/platform/common/email/email.service'
import { UserService } from './user.service'
import { BindMobileDot,VerifyEmailDot } from './user.dot'

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  @Get()
  detail() {
    return this.userService.detail(1)
  }

  @Post('bind-mobile')
  bindMobile(@Headers('authorization') authToken: string, @Body() { mobile }: BindMobileDot) {
    const { userId } = useParseToken(authToken)
    return this.userService.bindMobile(userId, mobile)
  }
  @Post('verify-email')
  async verifyEmail(@Headers('authorization') authToken: string, @Body() { code, email }: VerifyEmailDot) {
    await this.emailService.verify(email, code!)
    const { userId } = useParseToken(authToken)
    return this.userService.verifyEmail(userId, email)
  }
  @Post('update-email')
  async updateEmail(@Headers('authorization') authToken: string, @Body() { code, email }: VerifyEmailDot) {
    await this.emailService.verify(email, code!)
    const { userId } = useParseToken(authToken)
    return this.userService.updateEmail(userId, email)
  }
}
