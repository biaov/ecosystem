@Injectable()
export class LoginService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  @InjectRepository(UserRoleModel)
  private userRoleRepository: Repository<UserRoleModel>

  async login(username: string, password: string) {
    const result = (await this.userRepository.findOne({
      where: {
        username,
        password: md5(password)
      },
      relations: {
        user: true
      }
    })) as (UserModel & { role: UserRoleModel | null }) | null
    if (!result) throw new BizException('用户名或密码错误')
    result.role = await this.userRoleRepository.findOneBy({ code: result.user.roleCode })
    return result
  }
  async mobileLogin(username: string) {
    const result = await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.user', 'userDetail').where('userDetail.mobile = :mobile', { mobile: username }).getOne()
    if (!result) throw new BizException('用户不存在')
    return result
  }
  async adminLogin(username: string, password: string) {
    const result = (await this.userAdminRepository.findOne({
      where: {
        username,
        password: md5(password)
      },
      relations: {
        user: true
      },
      select: ['id', 'username', 'user', 'createdAt', 'updatedAt']
    })) as UserAdminModel & { role: UserRoleModel | null }
    if (!result) throw new BizException('用户名或密码错误')
    result.role = await this.userRoleRepository.findOneBy({ code: result.user.roleCode })
    return result
  }
  async mobileAdminLogin(username: string) {
    const result = await this.userAdminRepository.createQueryBuilder('userAdmin').leftJoinAndSelect('userAdmin.user', 'userDetail').where('userDetail.mobile = :mobile', { mobile: username }).getOne()
    if (!result) throw new BizException('用户不存在')
    return result
  }
}
