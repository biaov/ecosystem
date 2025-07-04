import { UserService } from './user.service'
import { PermissionLogDto } from './user.dot'

@UseGuards(AuthGuardAdmin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('admin')
  detail(@Param('id') id: number) {}
}
