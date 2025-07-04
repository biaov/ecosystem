import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
