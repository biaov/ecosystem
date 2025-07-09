import { PermissionKeyEnum } from '@/enums'
import { SettingService } from './setting.service'
import { UpdateSettingDto } from './setting.dot'
import { SettingKeyEnum } from './enums'

const permUserKey = definePermission(PermissionKeyEnum.settingUser)
const permProtocolKey = definePermission(PermissionKeyEnum.settingProtocol)
const permOrderKey = definePermission(PermissionKeyEnum.settingOrder)
const permHotkeywordKey = definePermission(PermissionKeyEnum.settingHotkeyword)

@UseGuards(AuthGuardAdmin)
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  // 用户设置
  @Permission(permUserKey.list)
  @Get(SettingKeyEnum.user)
  findUser() {
    return this.settingService.find(SettingKeyEnum.user)
  }

  @Log(ModuleLabelEnum.settingUser, '创建内容')
  @Permission(permUserKey.create)
  @Post(SettingKeyEnum.user)
  createUser(@Body() { value }: UpdateSettingDto) {
    return this.settingService.create({ key: SettingKeyEnum.user, value })
  }

  @Log(ModuleLabelEnum.settingUser, '更新内容')
  @Permission(permUserKey.update)
  @Post(`${SettingKeyEnum.user}/update`)
  updateUser(@Body() { value }: UpdateSettingDto) {
    return this.settingService.update({ key: SettingKeyEnum.user, value })
  }

  // 隐私协议设置
  @Permission(permProtocolKey.list)
  @Get(SettingKeyEnum.protocol)
  findProtocol() {
    return this.settingService.find(SettingKeyEnum.protocol)
  }

  @Log(ModuleLabelEnum.settingProtocol, '创建内容')
  @Permission(permProtocolKey.create)
  @Post(SettingKeyEnum.protocol)
  createProtocol(@Body() { value }: UpdateSettingDto) {
    return this.settingService.create({ key: SettingKeyEnum.protocol, value })
  }

  @Log(ModuleLabelEnum.settingProtocol, '更新内容')
  @Permission(permProtocolKey.update)
  @Post(`${SettingKeyEnum.protocol}/update`)
  updateProtocol(@Body() { value }: UpdateSettingDto) {
    return this.settingService.update({ key: SettingKeyEnum.protocol, value })
  }

  // 订单设置
  @Permission(permOrderKey.list)
  @Get(SettingKeyEnum.order)
  findOrder() {
    return this.settingService.find(SettingKeyEnum.order)
  }

  @Log(ModuleLabelEnum.settingOrder, '创建内容')
  @Permission(permOrderKey.create)
  @Post(SettingKeyEnum.order)
  createOrder(@Body() { value }: UpdateSettingDto) {
    return this.settingService.create({ key: SettingKeyEnum.order, value })
  }

  @Log(ModuleLabelEnum.settingOrder, '更新内容')
  @Permission(permOrderKey.update)
  @Post(`${SettingKeyEnum.order}/update`)
  updateOrder(@Body() { value }: UpdateSettingDto) {
    return this.settingService.update({ key: SettingKeyEnum.order, value })
  }

  // 热搜词设置
  @Permission(permHotkeywordKey.list)
  @Get(SettingKeyEnum.hotkeyword)
  findHotkeyword() {
    return this.settingService.find(SettingKeyEnum.hotkeyword)
  }

  @Log(ModuleLabelEnum.settingHotkeyword, '创建内容')
  @Permission(permHotkeywordKey.create)
  @Post(SettingKeyEnum.hotkeyword)
  createHotkeyword(@Body() { value }: UpdateSettingDto) {
    return this.settingService.create({ key: SettingKeyEnum.hotkeyword, value })
  }

  @Log(ModuleLabelEnum.settingHotkeyword, '更新内容')
  @Permission(permHotkeywordKey.update)
  @Post(`${SettingKeyEnum.hotkeyword}/update`)
  updateHotkeyword(@Body() { value }: UpdateSettingDto) {
    return this.settingService.update({ key: SettingKeyEnum.hotkeyword, value })
  }
}
