@Injectable()
export class UserService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  @InjectRepository(UserPermissionModel)
  private userPersmissionRepository: Repository<UserPermissionModel>

  find(id: number) {
    return this.userRepository.find({
      where: {
        id
      },
      relations: {
        user: true
      }
    })
  }
  permission({ skip, take, current, pageSize }: PageOption, {}: Partial<{}>) {
    const where: Record<string, string | string[] | FindOperator<string> | undefined> = useTransfrormQuery({}, { nickname: 'like', content: 'like', createdAt: 'between' })
    return findAndCount(this.userPersmissionRepository.findAndCount({ where: {}, skip, take }), { current, pageSize })
  }
}
