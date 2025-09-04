import { DecoratorService } from './decorator.service'
import { UpdateDecoratorDto } from './decorator.dot'

const permKey = definePermission(PermissionKeyEnum.decoratorList)

@UseGuards(AuthGuardAdmin)
@Controller('decorator')
export class DecoratorController {
  constructor(private readonly decoratorService: DecoratorService) {}

  // 官网首页
  @Permission(permKey.list)
  @Get(DecoratorKeyEnum.home)
  async findHome() {
    const result = await this.decoratorService.find(DecoratorKeyEnum.home)
    return result?.value?.map?.((item, i) => ({ ...item, id: i + 1 })) ?? []
  }

  @Log(ModuleLabelEnum.settingUser, '更新内容')
  @Permission(permKey.update)
  @Post(`${DecoratorKeyEnum.home}`)
  updateHome(@Body() { value }: UpdateDecoratorDto) {
    return this.decoratorService.update({ key: DecoratorKeyEnum.home, value })
  }
}
