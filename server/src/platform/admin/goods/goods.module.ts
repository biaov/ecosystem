import { GoodsController, GoodsCategoryController } from './goods.controller'
import { GoodsService, GoodsCategoryService } from './goods.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GoodsModel, GoodsSpecModel, GoodsCategoryModel])],
  controllers: [GoodsController, GoodsCategoryController],
  providers: [GoodsService, GoodsCategoryService]
})
export class GoodsModule {}
