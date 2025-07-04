import { AccountService } from './account.service'
import { AccountDto, AccountCreateDto, AccountUpdateDto } from './permission.dto'

const permKey = definePermission('permission:account', { reset: 'reset' } as const)

@UseGuards(AuthGuardAdmin)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Permission(permKey.list)
  @Get()
  list(@Query() { nickname, mobile, current, pageSize, roleId }: AccountDto) {
    return this.accountService.list(getPageQuery({ current, pageSize }), { nickname, mobile, roleId: roleId ? +roleId : undefined })
  }

  @Permission(permKey.create)
  @Post()
  create(@Body() { username, nickname, roleId }: AccountCreateDto) {
    return this.accountService.create({ username, nickname, roleId })
  }

  @Permission(permKey.update)
  @Patch(':id')
  update(@IdParam() id: number, @Body() { username, nickname, roleId }: AccountUpdateDto) {
    return this.accountService.update(id, { username, nickname, roleId })
  }

  @Permission(permKey.delete)
  @Delete(':id')
  delete(@IdParam() id: number) {
    return this.accountService.delete(id)
  }

  @Permission(permKey.reset)
  @Delete(':id/reset-pwd')
  resetPwd(@IdParam() id: number) {
    return this.accountService.reset(id)
  }
}
