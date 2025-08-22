import { GiftController, GiftCategoryController } from './gift.controller'
import { GiftService, GiftCategoryService } from './gift.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GiftModel, GiftCategoryModel])],
  controllers: [GiftController, GiftCategoryController],
  providers: [GiftService, GiftCategoryService]
})
export class GiftModule {}
