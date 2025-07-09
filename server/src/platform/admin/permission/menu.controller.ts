import { BizException } from '@/exceptions/biz'
import { FindController } from '@/common/base.controller'
import { MenuService } from './menu.service'
import { MenuDto, MenuCreateDto, MenuUpdateDto } from './permission.dto'
import { PermissionType } from './enums'

const permKey = definePermission(PermissionKeyEnum.permissionMenu)

@UseGuards(AuthGuardAdmin)
@Controller('menu')
export class MenuController extends FindController {
  constructor(private readonly menuService: MenuService) {
    super(menuService)
  }

  @Permission(permKey.list)
  @Get()
  list(@Query() { all }: MenuDto) {
    return all ? this.menuService.all() : null
  }

  @Log(ModuleLabelEnum.permissionMenu, '创建权限标识：[name]')
  @Permission(permKey.create)
  @Post()
  create(@Body() { name, content, type, parentId }: MenuCreateDto) {
    if (!parentId && type === PermissionType.Action) throw new BizException(`顶级的 type 不能是 ${PermissionType.Action}`)
    return this.menuService.create({ name, content, type, parentId })
  }

  @Log(ModuleLabelEnum.permissionMenu, '更新权限标识：[name]')
  @Permission(permKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, content, type }: MenuUpdateDto) {
    return this.find(this.menuService.update(id, { name, content, type }), id)
  }

  @Log(ModuleLabelEnum.permissionMenu, '删除权限标识：[name]')
  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.menuService.delete(id), id, 'delete')
  }
}
