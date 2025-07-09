import { UserAdminModel } from '@/models/user'

@Injectable()
export class UserService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  @InjectRepository(UserAdminModel)
  private userAdminRepository: Repository<UserAdminModel>

  findAdmin(id: number) {
    return this.userAdminRepository.findOne({ where: { id }, relations: ['role'] })
  }
  updateAdmin(id: number, { avatar, nickname, gender, email }: Partial<Pick<UserAdminModel, 'avatar' | 'nickname' | 'gender' | 'email'>>) {
    return useAffected(this.userAdminRepository.update(id, { avatar, nickname, gender, email }))
  }
}
