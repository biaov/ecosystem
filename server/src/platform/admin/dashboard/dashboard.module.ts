import { UserModel } from '@/models/user'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OrderModel, UserModel])],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
