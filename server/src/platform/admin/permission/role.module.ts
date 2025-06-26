import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleModel])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
