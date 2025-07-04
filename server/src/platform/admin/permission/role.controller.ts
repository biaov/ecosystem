import { RoleService } from './role.service'
import { RoleDto, RoleCreateDto, RoleUpdateDto, RolePermissionDto } from './permission.dto'

const permKey = definePermission('permission:role', { psermission: 'psermission' } as const)

@UseGuards(AuthGuardAdmin)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission(permKey.list)
  @Get()
  list(@Query() { name, current, pageSize, all }: RoleDto) {
    return all ? this.roleService.all() : this.roleService.list(getPageQuery({ current, pageSize }), { name })
  }

  @Permission(permKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.roleService.detail(id)
  }

  @Permission(permKey.create)
  @Post()
  create(@Body() { name, code }: RoleCreateDto) {
    return this.roleService.create({ name, code })
  }

  @Permission(permKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, code }: RoleUpdateDto) {
    return this.roleService.update(id, { name, code })
  }

  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.roleService.delete(id)
  }

  @Permission(permKey.psermission)
  @Post(':id/permission')
  permission(@IdParam() id: number, @Body() { permissions }: RolePermissionDto) {
    return this.roleService.permission(id, { permissions })
  }
}
