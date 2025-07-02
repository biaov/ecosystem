import { RoleService } from './role.service'
import { RoleDto, RoleCreateDto, RoleUpdateDto, RolePermissionDto } from './permission.dto'

const permissionKey = definePermission('permission:role', { psermission: 'psermission' } as const)

@UseGuards(AuthGuardAdmin)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission(permissionKey.list)
  @Get()
  list(@Query() { name, current, pageSize }: RoleDto) {
    return this.roleService.list(getPageQuery({ current, pageSize }), { name })
  }

  @Permission(permissionKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.roleService.detail(id)
  }

  @Permission(permissionKey.create)
  @Post()
  create(@Body() { name, code }: RoleCreateDto) {
    return this.roleService.create({ name, code })
  }

  @Permission(permissionKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, code }: RoleUpdateDto) {
    return this.roleService.update(id, { name, code })
  }

  @Permission(permissionKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.roleService.delete(id)
  }

  @Permission(permissionKey.psermission)
  @Post(':id/permission')
  permission(@IdParam() id: number, @Body() { permissions }: RolePermissionDto) {
    return this.roleService.permission(id, { permissions })
  }
}
