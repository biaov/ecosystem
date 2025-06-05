import { UserModel } from '@/models/user'
import { BizException } from '@/exceptions/biz'

@Injectable()
export class LoginService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  @InjectRepository(UserRoleModel)
  private userRoleRepository: Repository<UserRoleModel>

  async login(username: string, password: string) {
    const result = await this.userRepository.findOne({
      where: {
        username,
        password: md5(password)
      },
      relations: {
        user: true
      }
    })
    if (isEmpty(result)) throw new BizException('用户名或密码错误')

    return result
  }
  async adminLogin(username: string, password: string) {
    const result = await this.userRoleRepository.findOne({
      where: {
        id: 1
      }
    })
    // const result = await this.userRepository.findOne({
    //   where: {
    //     username,
    //     password: md5(password)
    //   },
    //   relations: {
    //     user: true
    //   }
    // })
    // if (isEmpty(result)) throw new BizException('用户名或密码错误')

    // const roleIds = await this.roleService.getRoleIdsByUser(user.id)

    return result
  }
}
