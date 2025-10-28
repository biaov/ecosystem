import { Headers } from '@nestjs/common'
import { EmailService } from '@/platform/common/email/email.service'
import { UserService } from './user.service'
import { BindMobileDot, VerifyEmailDot, VerifyUserUpdateDot, VerifyPasswordDot } from './user.dot'

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
  async bindMobile(@Headers('authorization') authToken: string, @Body() { code, mobile }: BindMobileDot) {
    // await this.emailService.verify(mobile, code!)
    const { userId } = useParseToken(authToken)
    return this.userService.bindMobile(userId, mobile)
  }
  @Post('verify-email')
  async verifyEmail(@Headers('authorization') authToken: string, @Body() { code, email }: VerifyEmailDot) {
    await this.emailService.verify(email, code!)
    const { userId } = useParseToken(authToken)
    return this.userService.verifyEmail(userId, email)
  }
  @Post('update')
  async updateEmail(@Headers('authorization') authToken: string, @Body() { nickname, avatar, gender }: VerifyUserUpdateDot) {
    const { userId } = useParseToken(authToken)
    return this.userService.updateUser(userId, { nickname, avatar, gender })
  }
  @Post('update-password')
  async updatePassword(@Headers('authorization') authToken: string, @Body() { oPassword, password, cPassword }: VerifyPasswordDot) {
    const { userId } = useParseToken(authToken)
    return this.userService.updatePassword(userId, { oPassword, password, cPassword })
  }
}
