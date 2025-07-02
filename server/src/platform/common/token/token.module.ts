import { TokenService } from './token.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserAdminModel, UserRoleModel])],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
