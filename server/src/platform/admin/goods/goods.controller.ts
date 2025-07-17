import { FindController } from '@/common/base.controller'
import { GoodsService, GoodsCategoryService } from './goods.service'
import { GoodsDto, GoodsCategoryDto, GoodsCategoryCreateDto, GoodsCategoryUpdateDto } from './goods.dto'

const goodsPermKey = definePermission(PermissionKeyEnum.goodsList)
const goodsCategoryPermKey = definePermission(PermissionKeyEnum.goodsCategory)

@UseGuards(AuthGuardAdmin)
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Permission(goodsPermKey.list)
  @Get()
  list(@Query() { name, sku, categoryId, onsale, current, pageSize }: GoodsDto) {
    return this.goodsService.list(getPageQuery({ current, pageSize }), { name, sku, categoryId, onsale })
  }
}

@UseGuards(AuthGuardAdmin)
@Controller('goods/category')
export class GoodsCategoryController extends FindController {
  constructor(private readonly goodsCategoryService: GoodsCategoryService) {
    super(goodsCategoryService)
  }

  @Permission(goodsCategoryPermKey.list)
  @Get()
  list(@Query() { all }: GoodsCategoryDto) {
    return all ? this.goodsCategoryService.all() : null
  }

  @Log(ModuleLabelEnum.goodsCategory, '创建商品分类：[name]')
  @Permission(goodsCategoryPermKey.create)
  @Post()
  create(@Body() { name, parentId, sort }: GoodsCategoryCreateDto) {
    return this.goodsCategoryService.create({ name, parentId, sort })
  }

  @Log(ModuleLabelEnum.goodsCategory, '更新商品分类：[name]')
  @Permission(goodsCategoryPermKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, parentId, sort }: GoodsCategoryUpdateDto) {
    return this.find(this.goodsCategoryService.update(id, { name, parentId, sort }), id)
  }

  @Log(ModuleLabelEnum.goodsCategory, '删除商品分类：[name]')
  @Permission(goodsCategoryPermKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.goodsCategoryService.delete(id), id, 'delete')
  }
}
