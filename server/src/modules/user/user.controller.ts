import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getHello(@Param() { id }): Promise<any[]> {
    return this.userService.find(id)
  }
}
