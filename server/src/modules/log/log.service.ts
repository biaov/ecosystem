@Injectable()
export class LogService {
  @InjectRepository(MigrationsModel)
  private migrationRepository: Repository<MigrationsModel>

  @InjectRepository(LogModel)
  private logRepository: Repository<LogModel>

  async migration(page: PageOption, name?: string, createdAt?: string) {
    const where = {
      name,
      createdAt: createdAt as unknown as Date
    }
    const [items, total] = await this.migrationRepository.findAndCount({ where, ...page })
    return { items, total }
  }
  operation(page: PageOption, name?: string, createdAt?: string) {
    const where = {
      name,
      createdAt: createdAt as unknown as Date,
      ...page
    }
    console.log(where)
    return this.logRepository.findAndCountBy(where)
  }
}
