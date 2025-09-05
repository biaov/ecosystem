import { DecoratorService } from './decorator.service'
import { UpdateDecoratorDto } from './decorator.dot'

const permDecoratorHomeKey = definePermission(PermissionKeyEnum.decoratorHome)
const permDecoratorCategoryKey = definePermission(PermissionKeyEnum.decoratorCategory)

@UseGuards(AuthGuardAdmin)
@Controller('decorator')
export class DecoratorController {
  constructor(private readonly decoratorService: DecoratorService) {}

  // 官网首页
  @Permission(permDecoratorHomeKey.list)
  @Get(DecoratorKeyEnum.home)
  async findHome() {
    const result = await this.decoratorService.find(DecoratorKeyEnum.home)
    return result?.value?.map?.((item, i) => ({ ...item, id: i + 1 })) ?? []
  }

  @Log(ModuleLabelEnum.decoratorHome, '更新内容')
  @Permission(permDecoratorHomeKey.update)
  @Post(`${DecoratorKeyEnum.home}`)
  updateHome(@Body() { value }: UpdateDecoratorDto) {
    return this.decoratorService.update({ key: DecoratorKeyEnum.home, value })
  }

  // 官网分类
  @Permission(permDecoratorCategoryKey.list)
  @Get(DecoratorKeyEnum.category)
  async findCategory() {
    const result = await this.decoratorService.find(DecoratorKeyEnum.category)
    return result?.value
  }

  @Log(ModuleLabelEnum.decoratorCategory, '更新内容')
  @Permission(permDecoratorCategoryKey.update)
  @Post(`${DecoratorKeyEnum.category}`)
  updateCategory(@Body() { value }: UpdateDecoratorDto) {
    return this.decoratorService.update({ key: DecoratorKeyEnum.category, value })
  }
}
