import { LogModel } from '@/models/log'

@Injectable()
export class LogService {
  @InjectRepository(MigrationsModel)
  private migrationRepository: Repository<MigrationsModel>

  @InjectRepository(LogModel)
  private logRepository: Repository<LogModel>

  migration({ skip, take, current, pageSize }: PageOption, { name, createdAt }) {
    return findAndCount(this.migrationRepository.findAndCount({ where: { name, createdAt }, skip, take }), { current, pageSize })
  }
  operation({ skip, take, current, pageSize }: PageOption, { nickname, module, content, createdAt, ip }: Partial<Pick<LogModel, 'nickname' | 'module' | 'content' | 'createdAt' | 'ip'>>) {
    const where = useTransfrormQuery({ nickname, module, content, createdAt, ip }, { nickname: 'like', content: 'like', createdAt: 'between' })
    return findAndCount(this.logRepository.findAndCount({ where, skip, take }), { current, pageSize })
  }
  createOperation({ nickname, module, content, ip }: Pick<LogModel, 'nickname' | 'module' | 'content' | 'ip'>) {
    return this.logRepository.save({ nickname, module, content, ip })
  }
}
