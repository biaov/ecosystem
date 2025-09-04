import { DecoratorService } from './decorator.service'

@Controller('decorator')
export class DecoratorController {
  constructor(private readonly decoratorService: DecoratorService) {}

  // 官网首页
  @Get(DecoratorKeyEnum.home)
  async findHome() {
    const result = await this.decoratorService.find(DecoratorKeyEnum.home)
    return result?.value?.map?.((item, i) => ({ ...item, id: i + 1 })) ?? []
  }
}
