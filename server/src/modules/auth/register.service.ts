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

  async register(username: string, password: string, source: number) {
    // const exist = await this.userAdminRepository.findOneBy({ username })
    // if (exist) throw new BizException('账号已存在')
    // const userAdmin = new UserModel()
    // userAdmin.username = username
    // userAdmin.password = password
    // const userDetail = new UserDetailModel()
    // userDetail.username = username
    // userDetail.nickname = username
    // userDetail.source = source
    // userAdmin.user = userDetail
    // await this.userAdminRepository.save(userAdmin)
    // return true
  }
  async adminRegister(username: string, password: string, source: number) {
    // const exist = await this.userAdminRepository.findOneBy({ username })
    // if (exist) throw new BizException('账号已存在')
    await this.userAdminRepository.save({
      username,
      password
      // user: {
      //   username,
      //   nickname: username,
      //   source
      // }
    })
    return true
  }
}
