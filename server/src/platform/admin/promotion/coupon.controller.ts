import { FindController } from '@/common/base.controller'
import { CouponService } from './coupon.service'
import { CouponDto, CouponCreateDto, CouponUpdateDto, CouponStatisticDto } from './promotion.dto'

const permKey = definePermission(PermissionKeyEnum.promotionList)

@UseGuards(AuthGuardAdmin)
@Controller('coupon')
export class CouponController extends FindController {
  constructor(private readonly couponService: CouponService) {
    super(couponService)
  }

  @Permission(permKey.list)
  @Get()
  list(@Query() { name, type, current, pageSize, all }: CouponDto) {
    return all ? this.couponService.all() : this.couponService.list(getPageQuery({ current, pageSize }), { name, type })
  }

  @Permission(permKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.couponService.detail(id)
  }

  @Log(ModuleLabelEnum.promotionList, '创建优惠券：[name]')
  @Permission(permKey.create)
  @Post()
  create(@Body() { name, type, value, condition, startTime, endTime }: CouponCreateDto) {
    return this.couponService.create({ name, type, value, condition, startTime, endTime })
  }

  @Log(ModuleLabelEnum.promotionList, '更新优惠券：[name]')
  @Permission(permKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, endTime }: CouponUpdateDto) {
    return this.find(this.couponService.update(id, { name, endTime }), id)
  }

  @Log(ModuleLabelEnum.promotionList, '删除优惠券：[name]')
  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.couponService.delete(id), id, 'delete')
  }

  @Permission(permKey.list)
  @Get(':id/statistic-info')
  statisticInfo(@IdParam() id: number) {
    return this.couponService.statisticInfo(id)
  }

  @Permission(permKey.list)
  @Get(':id/statistic')
  statistic(@IdParam() id: number, @Query() { status, nickname, mobile, current, pageSize }: CouponStatisticDto) {
    return this.couponService.statistic(id, getPageQuery({ current, pageSize }), { nickname, mobile, status })
  }
}
