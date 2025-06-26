import { UserService } from './user.service'
import { PermissionLogDto } from './user.dot'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('permission')
  getPermission(@Query() {}: PermissionLogDto) {
    return this.userService.permission()
  }
}
