import { FindController } from '@/common/base.controller'
import { RoleService } from './role.service'
import { RoleDto, RoleCreateDto, RoleUpdateDto, RolePermissionDto } from './permission.dto'

const permKey = definePermission(PermissionKeyEnum.permissionRole, { permission: 'permission' } as const)

@UseGuards(AuthGuardAdmin)
@Controller('role')
export class RoleController extends FindController {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }

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

  @Log(ModuleLabelEnum.permissionRole, '创建角色：[name]')
  @Permission(permKey.create)
  @Post()
  create(@Body() { name }: RoleCreateDto) {
    return this.roleService.create({ name })
  }

  @Log(ModuleLabelEnum.permissionRole, '更新角色：[name]')
  @Permission(permKey.update)
  @Patch(':id')
  async update(@IdParam() id: number, @Body() { name }: RoleUpdateDto) {
    await this.roleService.update(id, { name })
    return await this.roleService.detail(id)
  }

  @Log(ModuleLabelEnum.permissionRole, '删除角色：[name]')
  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.roleService.delete(id), id, 'delete')
  }

  @Log(ModuleLabelEnum.permissionRole, '分配角色权限：[name]')
  @Permission(permKey.permission)
  @Post(':id/permission')
  permission(@IdParam() id: number, @Body() { permissions }: RolePermissionDto) {
    return this.find(this.roleService.permission(id, { permissions }), id)
  }
}
