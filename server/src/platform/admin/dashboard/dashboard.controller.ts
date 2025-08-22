import { DashboardService } from './dashboard.service'

const permKey = definePermission(PermissionKeyEnum.dashboard)

@UseGuards(AuthGuardAdmin)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}
  @Permission(permKey.list)
  @Get()
  static() {
    return this.dashboardService.static()
  }
}
