import { UserService } from './user.service'

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  detail() {
    return this.userService.find(1)
  }
}
