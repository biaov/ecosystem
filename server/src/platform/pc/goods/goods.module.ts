import { GoodsController, GoodsCategoryController } from './goods.controller'
import { GoodsService, GoodsCategoryService, GoodsStockService } from './goods.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GoodsModel, GoodsSpecModel, GoodsCategoryModel])],
  controllers: [GoodsController, GoodsCategoryController],
  providers: [GoodsService, GoodsCategoryService, GoodsStockService]
})
export class GoodsModule {}
