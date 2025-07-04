import { MenuService } from './menu.service'
import { MenuDto, MenuCreateDto, MenuUpdateDto } from './permission.dto'
import { PermissionType } from './enums'
import { BizException } from '@/exceptions/biz'

const permKey = definePermission('permission:menu')

@UseGuards(AuthGuardAdmin)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Permission(permKey.list)
  @Get()
  list(@Query() { all }: MenuDto) {
    return all ? this.menuService.all() : null
  }

  @Permission(permKey.create)
  @Post()
  create(@Body() { name, content, type, parentId }: MenuCreateDto) {
    if (!parentId && type === PermissionType.Action) throw new BizException(`顶级的 type 不能是 ${PermissionType.Action}`)
    return this.menuService.create({ name, content, type, parentId })
  }

  @Permission(permKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, content, type }: MenuUpdateDto) {
    return this.menuService.update(id, { name, content, type })
  }

  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.menuService.delete(id)
  }
}
