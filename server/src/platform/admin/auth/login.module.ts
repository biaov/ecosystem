import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserAdminModel])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
