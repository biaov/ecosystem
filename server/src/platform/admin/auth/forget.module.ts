import { EmailService } from '@/platform/common/email/email.service'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'


@Module({
  imports: [TypeOrmModule.forFeature([UserAdminModel])],
  controllers: [RegisterController],
  providers: [RegisterService, EmailService]
})
export class RegisterModule {}
