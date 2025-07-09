import { SettingController } from './setting.controller'
import { SettingService } from './setting.service'

@Module({
  imports: [TypeOrmModule.forFeature([SettingModel])],
  exports: [TypeOrmModule],
  controllers: [SettingController],
  providers: [SettingService]
})
export class SettingModule {}
