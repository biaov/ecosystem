import { UserService } from './user.service'
import { PermissionLogDto } from './user.dot'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
