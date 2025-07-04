@Injectable()
export class RegisterService {
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  async register(username: string, password: string, source: number) {
    const exist = await this.userAdminRepository.findOneBy({ username })
    if (exist) throw new BizException('账号已存在')

    const nickname = useRandomName('游客')

    const res = await this.userAdminRepository.save({
      nickname,
      username,
      password: md5(password),
      avatar: defaultAvatar,
      source,
      mobile: username,
      roleId: 2 // 游客
    })

    return res
  }
}
