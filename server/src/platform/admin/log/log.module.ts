import { LogController } from './log.controller'
import { LogService } from './log.service'

@Module({
  imports: [TypeOrmModule.forFeature([MigrationsModel, LogModel])],
  controllers: [LogController],
  providers: [LogService]
})
export class LogModule {}
