import { GoodsController, GoodsCategoryController, GoodsStockController } from './goods.controller'
import { GoodsService, GoodsCategoryService, GoodsStockService } from './goods.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GoodsModel, GoodsSpecModel, GoodsCategoryModel])],
  controllers: [GoodsController, GoodsCategoryController, GoodsStockController],
  providers: [GoodsService, GoodsCategoryService, GoodsStockService]
})
export class GoodsModule {}
