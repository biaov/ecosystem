@Injectable()
export class ForgetService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  async forget(username: string, password: string) {
    const userInfo = await this.userRepository.findOneBy({ username })
    if (!userInfo) throw new BizException('账号不存在')

    const res = await this.userRepository.update(userInfo.id, {
      password: md5(defaultPassword),
    })

    return res
  }
}
