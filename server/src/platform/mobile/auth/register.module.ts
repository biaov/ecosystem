import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
