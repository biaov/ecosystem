import { DecoratorModel } from '@/models/decorator'

@Injectable()
export class DecoratorService {
  @InjectRepository(DecoratorModel)
  private decoratorRepository: Repository<DecoratorModel>

  find(key: string) {
    return this.decoratorRepository.findOneBy({ key })
  }
  create({ key, value }: Pick<DecoratorModel, 'key' | 'value'>) {
    return this.decoratorRepository.save({ key, value })
  }
  async update({ key, value }: Pick<DecoratorModel, 'key' | 'value'>) {
    const decorator = await this.decoratorRepository.findOneBy({ key })
    if (!decorator) return this.create({ key, value })
    return useAffected(this.decoratorRepository.update({ key }, { value }))
  }
}
