import { UserModel } from '@/models/user'
import { BizException } from '@/exceptions/biz'
import { Repository } from 'typeorm'

@Injectable()
export class RegisterService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>
  private userDetailRepository: Repository<UserDetailModel>

  async register(username: string, password: string) {
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
  async adminRegister(username: string, password: string) {
    const exist = await this.userRepository.findBy({ username })
    if (exist) throw new BizException('账号已存在')
    const user = await this.userRepository.save({ username, password })
    console.log(user)
    // this.userRepository.findOne()
    return true
  }
}
