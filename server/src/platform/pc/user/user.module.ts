import { EmailService } from '@/platform/common/email/email.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService,EmailService]
})
export class UserModule {}
