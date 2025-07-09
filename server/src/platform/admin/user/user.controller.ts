import { UserService } from './user.service'
import { UpdateUserAdminDto } from './user.dot'

@UseGuards(AuthGuardAdmin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin/:id')
  findAdmin(@Param('id') id: number) {
    return this.userService.findAdmin(id)
  }
  @Patch('admin/:id')
  async updateAdmin(@Param('id') id: number, @Body() { avatar, nickname, gender, email }: UpdateUserAdminDto) {
    const result = await this.userService.updateAdmin(id, { avatar, nickname, gender, email })
    if (result) return await this.findAdmin(id)
    return result
  }
}
