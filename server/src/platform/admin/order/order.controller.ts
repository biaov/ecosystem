import { FindController } from '@/common/base.controller'
import { PermissionKeyEnum } from '@/enums'
import { OrderService, CreditOrderService } from './order.service'
import { OrderDto, CreditOrderDto, UpdateShippedDto } from './order.dto'

const orderPermKey = definePermission(PermissionKeyEnum.orderList)
const creditOrderPermKey = definePermission(PermissionKeyEnum.orderCredit)

@UseGuards(AuthGuardAdmin)
@Controller('order')
export class OrderController extends FindController {
  constructor(private readonly orderService: OrderService) {
    super(orderService)
  }

  @Permission(orderPermKey.list)
  @Get()
  list(@Query() { sn, nickname, mobile, sku, name, status, source, type, current, pageSize }: OrderDto) {
    return this.orderService.list(getPageQuery({ current, pageSize }), { sn, nickname, mobile, sku, name, status, source, type })
  }

  @Permission(orderPermKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.orderService.detail(id)
  }

  @Log(ModuleLabelEnum.orderList, '订单发货：[sn]')
  @Permission(orderPermKey.update)
  @Post(':id/shipped')
  updateShipped(@IdParam() id: number, @Body() { expressCode, expressSn }: UpdateShippedDto) {
    return this.find(this.orderService.updateShipped(id, { expressCode, expressSn }), id)
  }
}

@UseGuards(AuthGuardAdmin)
@Controller('credit-order')
export class CreditOrderController extends FindController {
  constructor(private readonly creditOrderService: CreditOrderService) {
    super(creditOrderService)
  }

  @Permission(creditOrderPermKey.list)
  @Get()
  list(@Query() { sn, nickname, mobile, sku, name, status, source, type, current, pageSize }: CreditOrderDto) {
    return this.creditOrderService.list(getPageQuery({ current, pageSize }), { sn, nickname, mobile, sku, name, status, source, type })
  }

  @Permission(creditOrderPermKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.creditOrderService.detail(id)
  }

  @Log(ModuleLabelEnum.orderList, '订单发货：[sn]')
  @Permission(creditOrderPermKey.update)
  @Post(':id/shipped')
  updateShipped(@IdParam() id: number, @Body() { expressCode, expressSn }: UpdateShippedDto) {
    return this.find(this.creditOrderService.updateShipped(id, { expressCode, expressSn }), id)
  }
}
