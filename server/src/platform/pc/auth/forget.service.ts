@Injectable()
export class ForgetService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  forget(username: string, password: string) {
    return useAffected(
      this.userRepository.update(
        { username },
        {
          password: md5(password)
        }
      ),
      '重置密码失败，请检查用户是否正确，再重试'
    )
  }
}
