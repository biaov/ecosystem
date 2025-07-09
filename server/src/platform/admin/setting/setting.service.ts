import { SettingModel } from '@/models/setting'

@Injectable()
export class SettingService {
  @InjectRepository(SettingModel)
  private settingRepository: Repository<SettingModel>

  find(key: string) {
    return this.settingRepository.findOneBy({ key })
  }
  create({ key, value }: Pick<SettingModel, 'key' | 'value'>) {
    return this.settingRepository.save({ key, value })
  }
  async update({ key, value }: Pick<SettingModel, 'key' | 'value'>) {
    return useAffected(this.settingRepository.update({ key }, { value }))
  }
}
