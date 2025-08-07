import { FindController } from '@/common/base.controller'
import { ActivityCouponService } from './activity-coupon.service'
import { CouponDto, CouponCreateDto, CouponUpdateDto } from './promotion.dto'

const couponPermKey = definePermission(PermissionKeyEnum.promotionList)

@UseGuards(AuthGuardAdmin)
@Controller('activity-coupon')
export class ActivityCouponController extends FindController {
  constructor(private readonly activityCouponService: ActivityCouponService) {
    super(activityCouponService)
  }

  @Permission(couponPermKey.list)
  @Get()
  list(@Query() { name, type, current, pageSize }: CouponDto) {
    return this.activityCouponService.list(getPageQuery({ current, pageSize }), { name, type })
  }

  @Permission(couponPermKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.activityCouponService.detail(id)
  }

  @Log(ModuleLabelEnum.promotionList, '创建优惠券：[name]')
  @Permission(couponPermKey.create)
  @Post()
  create(@Body() { name, type, value, startTime, endTime }: CouponCreateDto) {
    return this.activityCouponService.create({ name, type, value, startTime, endTime })
  }

  @Log(ModuleLabelEnum.promotionList, '更新优惠券：[name]')
  @Permission(couponPermKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, endTime }: CouponUpdateDto) {
    return this.find(this.activityCouponService.update(id, { name, endTime }), id)
  }

  @Log(ModuleLabelEnum.goodsList, '删除优惠券：[name]')
  @Permission(couponPermKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.activityCouponService.delete(id), id, 'delete')
  }
}
