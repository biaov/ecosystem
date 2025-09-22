@Injectable()
export class ForgetService {
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  forget(username: string, password: string) {
    return useAffected(
      this.userAdminRepository.update(
        { username },
        {
          password: md5(password)
        }
      ),
      '重置密码失败，请检查用户是否正确，再重试'
    )
  }
}
