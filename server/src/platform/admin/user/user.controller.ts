import { FindController } from '@/common/base.controller'
import { UserService } from './user.service'
import { UpdateUserAdminDto, UserDto, CreateBlocklistDto, BlocklistDto } from './user.dot'

const permUserKey = definePermission(PermissionKeyEnum.userList, { block: 'block' } as const)
const permBlacklisKey = definePermission(PermissionKeyEnum.userBlocklist)

@UseGuards(AuthGuardAdmin)
@Controller('user')
export class UserController extends FindController {
  constructor(private readonly userService: UserService) {
    super(userService)
  }

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
  @Permission(permUserKey.list)
  @Get()
  list(@Query() { current, pageSize, nickname, mobile, createdAt }: UserDto) {
    return this.userService.list(getPageQuery({ current, pageSize }), { nickname, mobile, createdAt })
  }

  @Log(ModuleLabelEnum.userList, '拉黑名单：[nickname]')
  @Permission(permUserKey.block)
  @Post('blocklist')
  createBlocklist(@Body() { id, reason }: CreateBlocklistDto) {
    return this.find(this.userService.createBlocklist({ id, reason }), id)
  }

  @Permission(permBlacklisKey.list)
  @Get('blocklist')
  blocklist(@Query() { current, pageSize, nickname, mobile, reason }: BlocklistDto) {
    return this.userService.blocklist(getPageQuery({ current, pageSize }), { nickname, mobile, reason })
  }

  @Log(ModuleLabelEnum.userBlocklist, '移出黑名单：[nickname]')
  @Permission(permBlacklisKey.delete)
  @Delete('blocklist/:id')
  deleteBlocklist(@IdParam() id: number) {
    return this.find(this.userService.deleteBlocklist(id), id, 'delete')
  }
}
