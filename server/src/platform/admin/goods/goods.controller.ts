import { FindController } from '@/common/base.controller'
import { GoodsService, GoodsCategoryService } from './goods.service'
import { GoodsDto, GoodsCreateDto, GoodsCategoryDto, GoodsCategoryCreateDto, GoodsCategoryUpdateDto } from './goods.dto'
import { PermissionKeyEnum } from '@/enums'

const goodsPermKey = definePermission(PermissionKeyEnum.goodsList)
const goodsCategoryPermKey = definePermission(PermissionKeyEnum.goodsCategory)

// @UseGuards(AuthGuardAdmin)
@Controller('goods')
export class GoodsController extends FindController {
  constructor(private readonly goodsService: GoodsService) {
    super(goodsService)
  }

  @Permission(goodsPermKey.list)
  @Get()
  list(@Query() { name, sku, categoryId, onsale, current, pageSize }: GoodsDto) {
    return this.goodsService.list(getPageQuery({ current, pageSize }), { name, sku, categoryId, onsale })
  }

  @Permission(goodsPermKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.goodsService.detail(id)
  }

  @Log(ModuleLabelEnum.goodsList, '创建商品：[name]')
  @Permission(goodsPermKey.create)
  @Post()
  create(@Body() { categoryId, name, onsale, photos, specs, desc, defaultSku }: GoodsCreateDto) {
    return this.goodsService.create({ categoryId, name, onsale, photos, defaultSku, specs, desc })
  }

  @Log(ModuleLabelEnum.goodsList, '更新商品：[name]')
  @Permission(goodsPermKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { categoryId, name, onsale, photos, defaultSku, specs, desc }: GoodsCreateDto) {
    return this.find(this.goodsService.update(id, { categoryId, name, onsale, defaultSku, photos, specs, desc }), id)
  }

  @Log(ModuleLabelEnum.goodsList, '删除商品：[name]')
  @Permission(goodsPermKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.goodsService.delete(id), id, 'delete')
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
