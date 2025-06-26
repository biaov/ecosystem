@Injectable()
export class RegisterService {
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>
  async register(username: string, password: string, source: number) {
    const exist = await this.userAdminRepository.findOneBy({ username })
    if (exist) throw new BizException('账号已存在')

    const res = await this.userAdminRepository.save({
      username,
      password: md5(password),
      user: {
        username,
        nickname: username,
        source,
        mobile: username,
        roleCode: DefaultRoleCodeEnum.Visitor
      }
    })

    return res
  }
}
