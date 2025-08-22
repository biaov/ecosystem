import { UserAdminModel } from '@/models/user'

@Injectable()
export class AccountService {
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  @InjectRepository(UserRoleModel)
  private userRoleRepository: Repository<UserRoleModel>

  async verifyRole(roleId: number) {
    const exist = await this.userRoleRepository.existsBy({ id: roleId })
    if (!exist) throw new BizException('角色不存在')
    return true
  }

  async list({ skip, take, current, pageSize }: PageOption, { nickname, mobile, roleId }: Partial<Pick<UserAdminModel, 'nickname' | 'mobile' | 'roleId'>>) {
    const where = useTransfrormQuery({ nickname, mobile, roleId }, { nickname: 'like', mobile: 'like' })
    return findAndCount(this.userAdminRepository.findAndCount({ where, skip, take }), { current, pageSize })
  }

  detail(id: number) {
    return this.userAdminRepository.findOneBy({ id })
  }

  async create({ username, nickname, roleId }: Pick<UserAdminModel, 'username' | 'nickname' | 'roleId'>) {
    if (!(await this.verifyRole(roleId))) return
    const password = md5(defaultPwd)
    return this.userAdminRepository.save({ username, password, nickname, roleId })
  }

  async update(id: number, { username, nickname, roleId }: Partial<Pick<UserAdminModel, 'username' | 'nickname' | 'roleId'>>) {
    const option: { username?: string; nickname?: string; roleId?: number } = { username, nickname }
    if (roleId) {
      option.roleId = roleId
      if (!(await this.verifyRole(roleId))) return
    }
    return useAffected(this.userAdminRepository.update({ id }, option))
  }

  delete(id: number) {
    return useAffected(this.userAdminRepository.delete({ id }))
  }
  reset(id: number) {
    return useAffected(this.userAdminRepository.update({ id }, { password: md5(defaultPwd) }))
  }
}
