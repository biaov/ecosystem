import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CartModel, GoodsModel, GoodsSpecModel])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
