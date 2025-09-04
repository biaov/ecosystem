import { DecoratorController } from './decorator.controller'
import { DecoratorService } from './decorator.service'

@Module({
  imports: [TypeOrmModule.forFeature([DecoratorModel])],
  exports: [TypeOrmModule],
  controllers: [DecoratorController],
  providers: [DecoratorService]
})
export class DecoratorModule {}
