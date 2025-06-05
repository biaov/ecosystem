import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'
import { CaptchaValidator } from '@/validator/captcha'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserAdminModel])],
  exports: [TypeOrmModule],
  controllers: [RegisterController],
  providers: [RegisterService, CaptchaValidator]
})
export class RegisterModule {}
