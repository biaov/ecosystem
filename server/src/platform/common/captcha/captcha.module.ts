import { CaptchaController } from './captcha.controller'
import { CaptchaService } from './captcha.service'

@Module({
  controllers: [CaptchaController],
  providers: [CaptchaService],
  exports: [CaptchaService]
})
export class CaptchaModule {}
