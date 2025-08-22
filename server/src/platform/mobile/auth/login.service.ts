@Injectable()
export class LoginService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  async login(username: string, password: string) {
    const result = await this.userRepository.findOne({
      where: {
        username,
        password: md5(password)
      }
    })
    if (!result) throw new BizException('用户名或密码错误')
    return result
  }
  async mobileLogin(username: string) {
    const result = await this.userRepository.findOneBy({ username })
    if (!result) throw new BizException('用户不存在')
    return result
  }
}
