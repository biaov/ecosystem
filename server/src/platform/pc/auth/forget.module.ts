import { CaptchaService } from '@/platform/common/captcha/captcha.service'
import { ForgetController } from './forget.controller'
import { ForgetService } from './forget.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [ForgetController],
  providers: [ForgetService, CaptchaService]
})
export class ForgetModule {}
