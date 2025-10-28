@Injectable()
export class UserService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  detail(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async bindMobile(id: number, mobile: string) {
    await useAffected(this.userRepository.update({ id }, { mobile }))
    return await this.detail(id)
  }

  async verifyEmail(id: number, mobile: string) {
    await useAffected(this.userRepository.update({ id }, { mobile }))
    return await this.detail(id)
  }

  async updateEmail(id: number, mobile: string) {
    await useAffected(this.userRepository.update({ id }, { mobile }))
    return await this.detail(id)
  }

  async updateUser(id: number, { nickname, avatar, gender }: { nickname?: string; avatar?: string; gender?: number }) {
    await useAffected(this.userRepository.update({ id }, { nickname, avatar, gender }))
    return await this.detail(id)
  }
  async updatePassword(id: number, { oPassword, password, cPassword }: { oPassword: string; password: string; cPassword: string }) {
    if (password !== cPassword) throw new BizException('两次输入的密码不一致')
    const user = await this.userRepository.findOneBy({ id, password: md5(oPassword) })
    if (!user) throw new BizException('旧密码错误')
    return await useAffected(this.userRepository.update({ id }, { password: md5(password) }))
  }
}
