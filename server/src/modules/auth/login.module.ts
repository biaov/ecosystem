import { CaptchaService } from '@/modules/common/captcha.service'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { TokenService } from '../common/token.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserDetailModel, UserAdminModel, UserRoleModel])],
  controllers: [LoginController],
  providers: [LoginService, CaptchaService, TokenService],
  exports: [TokenService]
})
export class LoginModule {}
