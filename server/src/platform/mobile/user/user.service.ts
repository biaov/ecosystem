@Injectable()
export class UserService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>

  find(id: number) {
    return this.userRepository.find({
      where: {
        id
      }
    })
  }
}
