import { RoleService } from './role.service'
import { RoleDto, RoleCreateDto, RoleUpdateDto, RolePermissionDto } from './permission.dto'

// @UseGuards(AuthGuardAdmin)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  list(@Query() { name, current, pageSize }: RoleDto) {
    return this.roleService.list(getPageQuery({ current, pageSize }), { name })
  }

  @Get(':id')
  detail(@IdParam() id: number) {
    return this.roleService.detail(id)
  }

  @Post()
  create(@Body() { name, code }: RoleCreateDto) {
    return this.roleService.create({ name, code })
  }

  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, code }: RoleUpdateDto) {
    return this.roleService.update(id, { name, code })
  }

  @Post(':id/permission')
  permission(@IdParam() id: number, @Body() { permissions }: RolePermissionDto) {
    return this.roleService.permission(id, { permissions })
  }

  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.roleService.delete(id)
  }
}
