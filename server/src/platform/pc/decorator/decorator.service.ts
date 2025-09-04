import { DecoratorModel } from '@/models/decorator'

@Injectable()
export class DecoratorService {
  @InjectRepository(DecoratorModel)
  private decoratorRepository: Repository<DecoratorModel>

  find(key: string) {
    return this.decoratorRepository.findOneBy({ key })
  }
}
