import { LogController } from './log.controller'
import { LogService } from './log.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MigrationsModel, LogModel])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService]
})
export class LogModule {}
