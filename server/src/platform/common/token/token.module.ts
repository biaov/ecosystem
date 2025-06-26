import { TokenService } from './token.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserAdminModel])],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
