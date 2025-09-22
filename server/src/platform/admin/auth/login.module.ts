import { EmailService } from '@/platform/common/email/email.service'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserAdminModel])],
  controllers: [LoginController],
  providers: [LoginService, EmailService]
})
export class LoginModule {}
