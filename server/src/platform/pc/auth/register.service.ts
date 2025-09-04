@Injectable()
export class RegisterService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  async register(username: string, password: string, source: string) {
    const exist = await this.userRepository.findOneBy({ username })
    if (exist) throw new BizException('账号已存在')

    const nickname = useRandomName('游客')

    const res = await this.userRepository.save({
      nickname,
      username,
      password: md5(password),
      avatar: defaultAvatar,
      source,
      mobile: username,
      role: { id: 2 } // 游客
    })

    return res
  }
}
