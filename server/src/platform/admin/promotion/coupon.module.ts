import { CouponController } from './coupon.controller'
import { CouponService } from './coupon.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CouponModel, UserCouponModel])],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
