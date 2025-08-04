import { UserService } from './user.service'
import { PermissionLogDto } from './user.dot'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('permission')
  getPermission(@Query() {}: PermissionLogDto) {
    return this.userService.permission()
  }
  private async findDefaultProduct(items) {
    const result = await this.goodsSpecModelRepository.find({ where: items.map(({ sku }) => ({ sku })), relations: ['product'] })
    const skus = result.map(({ sku }) => sku)
    if (result.length !== items.length) throw new BizException(`sku ${items.find(item => !skus.includes(item.sku))?.sku} 不存在`)
    return result
  }
}
