import { UserModel } from '@/models/user'
import { DistributeCouponController } from './distribute-coupon.controller'
import { DistributeCouponService } from './distribute-coupon.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([DistributeCouponModel, DistributeCouponRuleModel, UserCouponModel, UserModel])],
  controllers: [DistributeCouponController],
  providers: [DistributeCouponService]
})
export class DistributeCouponModule {}
