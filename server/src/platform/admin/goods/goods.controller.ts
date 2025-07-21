import { resolve } from 'path'
import type { Response } from 'express'
import { FindController } from '@/common/base.controller'
import { GoodsService, GoodsCategoryService, GoodsStockService } from './goods.service'
import { GoodsDto, GoodsCreateDto, GoodsCategoryDto, GoodsCategoryCreateDto, GoodsCategoryUpdateDto, GoodsStockDto } from './goods.dto'
import { PermissionKeyEnum } from '@/enums'

const goodsPermKey = definePermission(PermissionKeyEnum.goodsList)
const goodsCategoryPermKey = definePermission(PermissionKeyEnum.goodsCategory)
const goodsStockPermKey = definePermission(PermissionKeyEnum.goodsStock, { download: 'downloadTemplate', import: 'importStock' } as const)

@UseGuards(AuthGuardAdmin)
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

  @Log(ModuleLabelEnum.goodsList, '上下架商品：[name]')
  @Permission(goodsPermKey.update)
  @Post(':id/onsale')
  updateOnsale(@IdParam() id: number, @Body() { onsale }: Pick<GoodsCreateDto, 'onsale'>) {
    return this.find(this.goodsService.updateOnsale(id, { onsale }), id)
  }

  @Log(ModuleLabelEnum.goodsList, '删除商品：[name]')
  @Permission(goodsPermKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.goodsService.delete(id), id, 'delete')
  }
}

@UseGuards(AuthGuardAdmin)
@Controller('goods-category')
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

@UseGuards(AuthGuardAdmin)
@Controller('goods-stock')
export class GoodsStockController extends FindController {
  constructor(private readonly goodsStockService: GoodsStockService) {
    super(goodsStockService)
  }

  @Permission(goodsStockPermKey.list)
  @Get()
  list(@Query() { name, sku, categoryId, onsale, current, pageSize }: GoodsDto) {
    return this.goodsStockService.list(getPageQuery({ current, pageSize }), { name, sku, categoryId, onsale })
  }

  @Permission(goodsStockPermKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.goodsStockService.detail(id)
  }

  @Log(ModuleLabelEnum.goodsList, '更新商品库存：[sku]')
  @Permission(goodsStockPermKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { stock }: GoodsStockDto) {
    return this.find(this.goodsStockService.update(id, { stock }), id)
  }

  @Permission(goodsStockPermKey.download)
  @Get('template/download')
  download(@Res() res: Response) {
    const filePath = resolve(import.meta.dirname, '../../../assets/sku-template.xls')
    res.download(filePath, `${+new Date()}.xls`)
  }

  @Log(ModuleLabelEnum.goodsList, '批量导入库存')
  @Permission(goodsStockPermKey.import)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 5
      },
      fileFilter(_, file, callback) {
        if (!/\.xlsx?$/.test(file.originalname)) {
          callback(new BizException('只能上传 .xlsx 或 .xls 格式的文件'), false)
        } else {
          callback(null, true)
        }
      }
    })
  )
  @Post('import/stock')
  import(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BizException('文件上传失败')
    return this.goodsStockService.betachUpdate(useXlsx<{ sku: string; stock: number }>(file, { sku: 'sku', 库存: 'stock' }).filter(item => item.sku))
  }
}
