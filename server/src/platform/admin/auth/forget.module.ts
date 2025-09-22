import { EmailService } from '@/platform/common/email/email.service'
import { ForgetController } from './forget.controller'
import { ForgetService } from './forget.service'


@Module({
  imports: [TypeOrmModule.forFeature([UserAdminModel])],
  controllers: [ForgetController],
  providers: [ForgetService, EmailService]
})
export class ForgetModule {}
