import { GoodsService, GoodsCategoryService } from './goods.service'
import { GoodsDto, GoodsCategoryDto } from './goods.dto'

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
  list(@Query() { name, sku, categoryId, current, pageSize }: GoodsDto) {
    return this.goodsService.list(getPageQuery({ current, pageSize }), { name, sku, categoryId, onsale: true })
  }

  @Get(':id')
  detail(@IdParam() id: number) {
    return this.goodsService.detail(id)
  }
}

@Controller('goods-category')
export class GoodsCategoryController {
  constructor(private readonly goodsCategoryService: GoodsCategoryService) {}

  @Get()
  list(@Query() { all }: GoodsCategoryDto) {
    return all ? this.goodsCategoryService.all() : null
  }
}
