import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserDetailModel, UserAdminModel, UserRoleModel])],
  exports: [TypeOrmModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
