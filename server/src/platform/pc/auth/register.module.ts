import { CaptchaService } from '@/platform/common/captcha/captcha.service'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserAdminModel])],
  controllers: [RegisterController],
  providers: [RegisterService, CaptchaService]
})
export class RegisterModule {}
