import { RoleService } from './role.service'
import { RoleDto } from './permission.dto'

// @UseGuards(AuthGuardAdmin)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  list(@Query() { name, createdAt, current, pageSize }: RoleDto) {
    return this.roleService.list(getPageQuery({ current, pageSize }), { name, createdAt })
  }
}
