import { FindController } from '@/common/base.controller'
import { OrderService, CreditOrderService, SaleOrderService } from './order.service'
import { OrderDto, CreditOrderDto, UpdateShippedDto, UpdateExamineDto, SaleOrderDto } from './order.dto'

const orderPermKey = definePermission(PermissionKeyEnum.orderList)
const creditOrderPermKey = definePermission(PermissionKeyEnum.orderCredit)
const saleOrderPermKey = definePermission(PermissionKeyEnum.orderSale, { receive: 'receive', refund: 'refund' } as const)

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

@UseGuards(AuthGuardAdmin)
@Controller('sale-order')
export class SaleOrderController extends FindController {
  constructor(private readonly saleOrderService: SaleOrderService) {
    super(saleOrderService)
  }

  @Permission(saleOrderPermKey.list)
  @Get()
  list(@Query() { orderSn, sn, nickname, mobile, sku, name, status, type, current, pageSize }: SaleOrderDto) {
    return this.saleOrderService.list(getPageQuery({ current, pageSize }), { orderSn, sn, nickname, mobile, sku, name, status, type })
  }

  @Permission(saleOrderPermKey.list)
  @Get(':id')
  detail(@IdParam() id: number) {
    return this.saleOrderService.detail(id)
  }

  @Log(ModuleLabelEnum.orderSale, '售后订单审核：[sn]')
  @Permission(saleOrderPermKey.update)
  @Post(':id/examine')
  updateExamine(@IdParam() id: number, @Body() { result, type }: UpdateExamineDto) {
    return this.find(this.saleOrderService.updateExamine(id, { result, type }), id)
  }

  @Log(ModuleLabelEnum.orderSale, '售后订单签收：[sn]')
  @Permission(saleOrderPermKey.receive)
  @Post(':id/receive')
  updateReceive(@IdParam() id: number) {
    return this.find(this.saleOrderService.updateReceive(id), id)
  }
  @Log(ModuleLabelEnum.orderSale, '售后订单退款：[sn]')
  @Permission(saleOrderPermKey.refund)
  @Post(':id/refund')
  updateRefund(@IdParam() id: number, @Body() { result, type }: UpdateExamineDto) {
    return this.find(this.saleOrderService.updateRefund(id, { result, type }), id)
  }
}
