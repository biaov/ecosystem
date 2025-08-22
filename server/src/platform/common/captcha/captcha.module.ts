import { CaptchaController } from './captcha.controller'
import { CaptchaService } from './captcha.service'

@Global()
@Module({
  controllers: [CaptchaController],
  providers: [CaptchaService],
  exports: [CaptchaService]
})
export class CaptchaModule {}
