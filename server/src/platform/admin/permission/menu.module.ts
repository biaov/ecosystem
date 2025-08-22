import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

@Module({
  imports: [TypeOrmModule.forFeature([MenuModel])],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
