@Injectable()
export class LoginService {
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  @InjectRepository(UserRoleModel)
  private userRoleRepository: Repository<UserRoleModel>

  private async getRole<T extends Record<string, any>>(result: T) {
    const role = await this.userRoleRepository.findOne({ where: { code: result.user.roleCode } })
    // if (!role) throw new BizException('用户角色不存在')
    ;(result as Record<string, any>).role = role
    return result as T
  }

  async login(username: string, password: string) {
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
    return this.getRole(result)
  }
  async mobileLogin(username: string) {
    const result = (await this.userAdminRepository
      .createQueryBuilder('userAdmin')
      .leftJoinAndSelect('userAdmin.user', 'userDetail')
      .where('userDetail.mobile = :mobile', { mobile: username })
      .getOne()) as UserAdminModel & { role: UserRoleModel | null }
    if (!result) throw new BizException('用户不存在')
    return this.getRole(result)
  }
}
