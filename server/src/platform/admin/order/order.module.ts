import { OrderController, CreditOrderController, SaleOrderController } from './order.controller'
import { OrderService, CreditOrderService, SaleOrderService } from './order.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OrderModel, OrderItemModel, OrderTraceModel, CreditOrderModel, CreditOrderItemModel, OrderInvoiceModel, SaleOrderModel])],
  controllers: [OrderController, CreditOrderController, SaleOrderController],
  providers: [OrderService, CreditOrderService, SaleOrderService]
})
export class OrderModule {}
