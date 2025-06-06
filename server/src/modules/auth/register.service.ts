import { UserAdminModel, UserModel } from '@/models/user'
import { BizException } from '@/exceptions/biz'

@Injectable()
export class RegisterService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>
  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>
  @InjectRepository(UserDetailModel)
  private userDetailRepository: Repository<UserDetailModel>

  constructor() {}

  async register(username: string, password: string) {
    const result = await this.userRepository.findOne({
      where: {
        username,
        password
      },
      relations: {
        user: true
      }
    })
    if (!result) throw new BizException('用户名或密码错误')

    return result
  }
  async adminRegister(username: string, password: string) {
    const exist = await this.userAdminRepository.findOneBy({ username })
    if (exist) throw new BizException('账号已存在')
    const userAdmin = new UserAdminModel()
    userAdmin.username = username
    userAdmin.password = password
    const userDetail = new UserDetailModel()
    userDetail.username = username
    userDetail.nickname = username
    userDetail.source = 0
    userAdmin.user = userDetail
    return await this.userAdminRepository.save(userAdmin)
  }
}
