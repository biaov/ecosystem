import { DistributeCouponController } from './distribute-coupon.controller'
import { DistributeCouponService } from './distribute-coupon.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([DistributeCouponModel])],
  controllers: [DistributeCouponController],
  providers: [DistributeCouponService]
})
export class DistributeCouponModule {}
