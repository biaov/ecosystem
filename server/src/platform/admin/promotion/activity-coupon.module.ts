import { ActivityCouponController } from './activity-coupon.controller'
import { ActivityCouponService } from './activity-coupon.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ActivityCouponModel])],
  controllers: [ActivityCouponController],
  providers: [ActivityCouponService]
})
export class ActivityCouponModule {}
