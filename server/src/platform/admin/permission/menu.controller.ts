import { MenuService } from './menu.service'
import { MenuDto, MenuCreateDto, MenuUpdateDto } from './permission.dto'
import { PermissionType } from './enums'
import { BizException } from '@/exceptions/biz'

// @UseGuards(AuthGuardAdmin)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  list(@Query() { name, createdAt, current, pageSize, all }: MenuDto) {
    return all ? this.menuService.all() : this.menuService.list(getPageQuery({ current, pageSize }), { name, createdAt })
  }

  @Post()
  create(@Body() { name, content, type, parentId }: MenuCreateDto) {
    if (!parentId && type === PermissionType.Action) throw new BizException(`顶级的 type 不能是 ${PermissionType.Action}`)
    return this.menuService.create({ name, content, type, parentId })
  }

  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, content }: MenuUpdateDto) {
    return this.menuService.update(id, { name, content })
  }

  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.menuService.delete(id)
  }
}
