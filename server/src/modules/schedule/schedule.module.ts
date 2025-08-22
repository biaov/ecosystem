import { ScheduleModule } from '@nestjs/schedule'
import { ActivityCouponService } from './activity-coupon.service'

const servies = import.meta.glob('./**/*.service.ts', { eager: true })

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([ActivityCouponModel, OrderModel, CreditOrderModel, SettingModel])],
  providers: [ActivityCouponService]
})
export class ScheduleAppModule {}
