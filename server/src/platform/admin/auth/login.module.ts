import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserDetailModel, UserAdminModel, UserRoleModel])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
