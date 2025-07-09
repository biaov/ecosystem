import { FindController } from '@/common/base.controller'
import { AccountService } from './account.service'
import { AccountDto, AccountCreateDto, AccountUpdateDto } from './permission.dto'

const permKey = definePermission(PermissionKeyEnum.permissionAccount, { reset: 'reset' } as const)

@UseGuards(AuthGuardAdmin)
@Controller('account')
export class AccountController extends FindController {
  constructor(private readonly accountService: AccountService) {
    super(accountService)
  }

  @Permission(permKey.list)
  @Get()
  list(@Query() { nickname, mobile, current, pageSize, roleId }: AccountDto) {
    return this.accountService.list(getPageQuery({ current, pageSize }), { nickname, mobile, roleId: roleId ? +roleId : undefined })
  }

  @Log(ModuleLabelEnum.permissionAccount, '创建后台账号：[nickname]')
  @Permission(permKey.create)
  @Post()
  create(@Body() { username, nickname, roleId }: AccountCreateDto) {
    return this.accountService.create({ username, nickname, roleId })
  }

  @Log(ModuleLabelEnum.permissionAccount, '更新后台账号：[nickname]')
  @Permission(permKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { username, nickname, roleId }: AccountUpdateDto) {
    return this.find<UserAdminModel>(this.accountService.update(id, { username, nickname, roleId }), id)
  }

  @Log(ModuleLabelEnum.permissionAccount, '删除后台账号：[nickname]')
  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.find<UserAdminModel>(this.accountService.delete(id), id, 'delete')
  }

  @Log(ModuleLabelEnum.permissionAccount, '重置账号密码：[nickname]')
  @Permission(permKey.reset)
  @Delete(':id/reset-pwd')
  resetPwd(@IdParam() id: number) {
    return this.find<UserAdminModel>(this.accountService.reset(id), id)
  }
}
