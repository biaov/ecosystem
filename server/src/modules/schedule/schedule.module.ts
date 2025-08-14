import { ScheduleModule } from '@nestjs/schedule'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([ActivityCouponModel, OrderModel])],
  providers: [ScheduleService]
})
export class ScheduleAppModule {}
