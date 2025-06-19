import { LogService } from './log.service'
import { LogDto } from './log.dto'

// @UseGuards(AuthGuardAdmin)
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('migration')
  migration(@Query() { name, createdAt, current, pageSize }: LogDto) {
    return this.logService.migration(getPageQuery({ current, pageSize }), name, createdAt)
  }
  @Get('operation')
  log(@Query() { name, createdAt, current, pageSize }: LogDto) {
    return this.logService.operation(getPageQuery({ current, pageSize }), name, createdAt)
  }
}
