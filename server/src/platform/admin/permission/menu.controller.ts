import { MenuService } from './menu.service'
import { MenuDto, MenuCreateDto, MenuUpdateDto } from './permission.dto'

// @UseGuards(AuthGuardAdmin)
@Controller('menu')
export class MenuController {
  constructor(private readonly roleService: MenuService) {}

  @Get()
  list(@Query() { name, createdAt, current, pageSize }: MenuDto) {
    return this.roleService.list(getPageQuery({ current, pageSize }), { name, createdAt })
  }
  @Post()
  create(@Body() { name, content, type, parentId }: MenuCreateDto) {
    return this.roleService.create({ name, content, type, parentId })
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() { name, content }: MenuUpdateDto) {
    if (!id) throw new BizException('ID不能为空')
    return this.roleService.update(id, { name, content })
  }
}
