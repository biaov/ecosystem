import { AccountController } from './account.controller'
import { AccountService } from './account.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserAdminModel, UserRoleModel])],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
