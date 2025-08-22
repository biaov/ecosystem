import { FindController } from '@/common/base.controller'
import { DistributeCouponService } from './distribute-coupon.service'
import { DistributeCouponDto, DistributeCouponCreateDto } from './promotion.dto'

const permKey = definePermission(PermissionKeyEnum.promotionDistribute)

@UseGuards(AuthGuardAdmin)
@Controller('distribute-coupon')
export class DistributeCouponController extends FindController {
  constructor(private readonly distributeCouponService: DistributeCouponService) {
    super(distributeCouponService)
  }

  @Permission(permKey.list)
  @Get()
  list(@Query() { title, mobile, current, pageSize }: DistributeCouponDto) {
    return this.distributeCouponService.list(getPageQuery({ current, pageSize }), { title, mobile })
  }

  @Permission(permKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.distributeCouponService.detail(id)
  }

  @Log(ModuleLabelEnum.promotionDistribute, '创建手动发券：[title]')
  @Permission(permKey.create)
  @Post()
  create(@Body() { title, range, rules }: DistributeCouponCreateDto) {
    return this.distributeCouponService.create({ title, range, rules })
  }
}
