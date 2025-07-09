import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserAdminModel, UserRoleModel])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UsersModule {}
