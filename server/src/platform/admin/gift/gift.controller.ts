import { resolve } from 'path'
import type { Response } from 'express'
import { FindController } from '@/common/base.controller'
import { GiftService, GiftCategoryService } from './gift.service'
import { GiftDto, GiftCreateDto, GiftCategoryDto, GiftCategoryCreateDto, GiftCategoryUpdateDto, GiftUpdateDto } from './gift.dto'
import { PermissionKeyEnum } from '@/enums'

const giftPermKey = definePermission(PermissionKeyEnum.giftList, { download: 'downloadTemplate', import: 'importStock' } as const)
const giftCategoryPermKey = definePermission(PermissionKeyEnum.giftCategory)

@UseGuards(AuthGuardAdmin)
@Controller('gift')
export class GiftController extends FindController {
  constructor(private readonly giftService: GiftService) {
    super(giftService)
  }

  @Permission(giftPermKey.list)
  @Get()
  list(@Query() { name, sku, categoryId, onsale, current, pageSize, recommend, newest, preferential }: GiftDto) {
    return this.giftService.list(getPageQuery({ current, pageSize }), { name, sku, categoryId, onsale, recommend, newest, preferential })
  }

  @Permission(giftPermKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.giftService.detail(id)
  }

  @Log(ModuleLabelEnum.giftList, '创建礼品：[name]')
  @Permission(giftPermKey.create)
  @Post()
  create(@Body() { categoryId, name, onsale, photos, desc, sku, credit, stock, recommend, newest, preferential }: GiftCreateDto) {
    return this.giftService.create({ categoryId, name, onsale, photos, sku, credit, stock, desc, recommend, newest, preferential })
  }

  @Log(ModuleLabelEnum.giftList, '更新礼品：[name]')
  @Permission(giftPermKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { categoryId, name, onsale, photos, sku, stock, desc, credit, recommend, newest, preferential }: GiftUpdateDto) {
    return this.find(this.giftService.update(id, { categoryId, name, onsale, sku, photos, stock, desc, credit, recommend, newest, preferential }), id)
  }

  @Log(ModuleLabelEnum.giftList, '删除礼品：[name]')
  @Permission(giftPermKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.giftService.delete(id), id, 'delete')
  }
  @Permission(giftPermKey.download)
  @Get('template/download')
  download(@Res() res: Response) {
    const filePath = resolve(import.meta.dirname, '../../../assets/sku-template.xls')
    res.download(filePath, `${+new Date()}.xls`)
  }

  @Log(ModuleLabelEnum.giftList, '批量导入库存')
  @Permission(giftPermKey.import)
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
    return this.giftService.betachUpdate(useXlsx<{ sku: string; stock: number }>(file, { sku: 'sku', 库存: 'stock' }).filter(item => item.sku))
  }
}

@UseGuards(AuthGuardAdmin)
@Controller('gift-category')
export class GiftCategoryController extends FindController {
  constructor(private readonly giftCategoryService: GiftCategoryService) {
    super(giftCategoryService)
  }

  @Permission(giftCategoryPermKey.list)
  @Get()
  list(@Query() { all }: GiftCategoryDto) {
    return all ? this.giftCategoryService.all() : null
  }

  @Log(ModuleLabelEnum.giftCategory, '创建礼品分类：[name]')
  @Permission(giftCategoryPermKey.create)
  @Post()
  create(@Body() { name, sort }: GiftCategoryCreateDto) {
    return this.giftCategoryService.create({ name, sort })
  }

  @Log(ModuleLabelEnum.giftCategory, '更新礼品分类：[name]')
  @Permission(giftCategoryPermKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, sort }: GiftCategoryUpdateDto) {
    return this.find(this.giftCategoryService.update(id, { name, sort }), id)
  }

  @Log(ModuleLabelEnum.giftCategory, '删除礼品分类：[name]')
  @Permission(giftCategoryPermKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.giftCategoryService.delete(id), id, 'delete')
  }
}
