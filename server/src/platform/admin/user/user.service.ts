import { UserAdminModel, UserModel } from '@/models/user'

@Injectable()
export class UserService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  findAdmin(id: number) {
    return this.userAdminRepository.findOne({ where: { id }, relations: ['role'] })
  }
  updateAdmin(id: number, { avatar, nickname, gender, email }: Partial<Pick<UserAdminModel, 'avatar' | 'nickname' | 'gender' | 'email'>>) {
    return useAffected(this.userAdminRepository.update(id, { avatar, nickname, gender, email }))
  }
  list({ skip, take, current, pageSize }: PageOption, { nickname, mobile, createdAt }: Partial<Pick<UserModel, 'nickname' | 'mobile'> & { createdAt: string[] }>) {
    const where = useTransfrormQuery({ nickname, mobile, createdAt, blocklist: false }, { nickname: 'like', mobile: 'like', createdAt: 'between' })
    return findAndCount(
      this.userRepository.findAndCount({
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
  detail(id: number) {
    return this.userRepository.findOneBy({ id })
  }
  async createBlocklist({ id, reason }: Partial<Pick<UserModel, 'id' | 'reason'>>) {
    return useAffected(this.userRepository.update({ id }, { reason, blocklist: true }))
  }
  blocklist({ skip, take, current, pageSize }: PageOption, { nickname, mobile, reason }: Partial<Pick<UserModel, 'nickname' | 'mobile' | 'reason'>>) {
    const where = useTransfrormQuery({ nickname, mobile, reason, blocklist: true }, { nickname: 'like', mobile: 'like' })
    return findAndCount(
      this.userRepository.findAndCount({
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
  deleteBlocklist(id: number) {
    return useAffected(this.userRepository.update({ id }, { blocklist: false }))
  }
}
