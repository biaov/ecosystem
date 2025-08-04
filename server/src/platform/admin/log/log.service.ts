import { LogModel, MigrationsModel } from '@/models/log'

@Injectable()
export class LogService {
  @InjectRepository(MigrationsModel)
  private migrationRepository: Repository<MigrationsModel>

  @InjectRepository(LogModel)
  private logRepository: Repository<LogModel>

  migration({ skip, take, current, pageSize }: PageOption, { name }: Partial<Pick<MigrationsModel, 'name'>>) {
    const where = useTransfrormQuery({ name }, { name: 'like' })
    return findAndCount(
      this.migrationRepository.findAndCount({
        where,
        skip,
        take,
        order: {
          createdAt: 'DESC'
        }
      }),
      { current, pageSize }
    )
  }
  operation({ skip, take, current, pageSize }: PageOption, { nickname, module, content, createdAt, ip }: Partial<Pick<LogModel, 'nickname' | 'module' | 'content' | 'ip'> & { createdAt: string[] }>) {
    const where = useTransfrormQuery({ nickname, module, content, createdAt, ip }, { nickname: 'like', content: 'like', createdAt: 'between' })
    return findAndCount(
      this.logRepository.findAndCount({
        where,
        skip,
        take,
        order: {
          createdAt: 'DESC'
        }
      }),
      { current, pageSize }
    )
  }
  createOperation({ nickname, module, content, ip }: Pick<LogModel, 'nickname' | 'module' | 'content' | 'ip'>) {
    return this.logRepository.save({ nickname, module, content, ip })
  }
}
