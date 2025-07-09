import { LogService } from './log.service'
import { LogDto, MigrationLogDto } from './log.dto'

const migraPermKey = definePermission(PermissionKeyEnum.logMigration)
const logPermKey = definePermission(PermissionKeyEnum.logOperation)

@UseGuards(AuthGuardAdmin)
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Permission(migraPermKey.list)
  @Get('migration')
  migration(@Query() { name, current, pageSize }: MigrationLogDto) {
    return this.logService.migration(getPageQuery({ current, pageSize }), { name })
  }
  @Permission(logPermKey.list)
  @Get('operation')
  log(@Query() { nickname, module, content, createdAt, ip, current, pageSize }: LogDto) {
    return this.logService.operation(getPageQuery({ current, pageSize }), { nickname, module, content, createdAt, ip })
  }
}
