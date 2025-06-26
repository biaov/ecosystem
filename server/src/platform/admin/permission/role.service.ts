@Injectable()
export class RoleService {
  @InjectRepository(UserRoleModel)
  private roleRepository: Repository<UserRoleModel>

  list({ skip, take, current, pageSize }: PageOption, { name, createdAt }) {
    const where = useTransfrormQuery({ name, createdAt }, { name: 'like', createdAt: 'between' })
    return findAndCount(this.roleRepository.findAndCount({ where, skip, take }), { current, pageSize })
  }
}
