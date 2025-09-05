const servies = import.meta.glob('./**/*.service.ts', { eager: true }) as Record<string, Record<string, new () => unknown>>
const providers = Object.values(servies).map(value => Object.values(value)[0])

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([ActivityCouponModel, OrderModel, CreditOrderModel, SettingModel])],
  providers
})
export class ScheduleAppModule {}
