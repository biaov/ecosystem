@Injectable()
export class RegisterService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>
  async register(username: string, password: string, source: number) {
    const exist = await this.userRepository.findOneBy({ username })
    if (exist) throw new BizException('账号已存在')

    const res = await this.userRepository.save({
      username,
      password: md5(password),
      source,
      mobile: username
    })

    return res
  }
}
