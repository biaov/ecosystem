@Injectable()
export class LogService {
  @InjectRepository(MigrationsModel)
  private migrationRepository: Repository<MigrationsModel>

  @InjectRepository(LogModel)
  private logRepository: Repository<LogModel>

  migration(page: PageOption, name?: string, createdAt?: string) {
    const where = {
      name,
      createdAt: createdAt as unknown as Date,
      ...page
    }
    return this.migrationRepository.findAndCountBy(where)
  }
  operation(page: PageOption, name?: string, createdAt?: string) {
    const where = {
      name,
      createdAt: createdAt as unknown as Date,
      ...page
    }
    return this.logRepository.findAndCountBy(where)
  }
}
