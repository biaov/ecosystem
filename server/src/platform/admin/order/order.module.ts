import { OrderController, CreditOrderController } from './order.controller'
import { OrderService, CreditOrderService } from './order.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OrderModel, OrderItemModel, OrderTraceModel, CreditOrderModel, CreditOrderItemModel, OrderInvoiceModel])],
  controllers: [OrderController, CreditOrderController],
  providers: [OrderService, CreditOrderService]
})
export class OrderModule {}
