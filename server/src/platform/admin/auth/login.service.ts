@Injectable()
export class LoginService {
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  async login(username: string, password: string) {
    const result = await this.userAdminRepository.findOne({
      where: {
        username,
        password: md5(password)
      },
      relations: ['role']
    })
    if (!result) throw new BizException('用户名或密码错误')
    return result
  }
  async mobileLogin(username: string) {
    const result = await this.userAdminRepository.findOne({
      where: {
        mobile: username
      },
      relations: ['role']
    })
    if (!result) throw new BizException('用户不存在')
    return result
  }
}
