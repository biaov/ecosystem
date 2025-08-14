import { FindController } from '@/common/base.controller'
import { ActivityCouponService } from './activity-coupon.service'
import { ActivityCouponDto, ActivityCouponCreateDto, ActivityCouponUpdateDto } from './promotion.dto'

const permKey = definePermission(PermissionKeyEnum.promotionActivity)

@UseGuards(AuthGuardAdmin)
@Controller('activity-coupon')
export class ActivityCouponController extends FindController {
  constructor(private readonly activityCouponService: ActivityCouponService) {
    super(activityCouponService)
  }

  @Permission(permKey.list)
  @Get()
  list(@Query() { name, status, current, pageSize }: ActivityCouponDto) {
    return this.activityCouponService.list(getPageQuery({ current, pageSize }), { name, status })
  }

  @Permission(permKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.activityCouponService.detail(id)
  }

  @Log(ModuleLabelEnum.promotionActivity, '创建活动发券：[name]')
  @Permission(permKey.create)
  @Post()
  create(@Body() { name, rules, setting, startTime, endTime, desc }: ActivityCouponCreateDto) {
    return this.activityCouponService.create({ name, rules, setting, startTime, endTime, desc })
  }

  @Log(ModuleLabelEnum.promotionActivity, '更新活动发券：[name]')
  @Permission(permKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { name, setting, endTime, desc }: ActivityCouponUpdateDto) {
    return this.find(this.activityCouponService.update(id, { name, setting, endTime, desc }), id)
  }

  @Log(ModuleLabelEnum.promotionActivity, '删除活动发券：[name]')
  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find(this.activityCouponService.delete(id), id, 'delete')
  }
}
