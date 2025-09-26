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
}
