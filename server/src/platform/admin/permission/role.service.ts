import { UserRoleModel } from '@/models/user'

@Injectable()
export class RoleService {
  @InjectRepository(UserRoleModel)
  private roleRepository: Repository<UserRoleModel>

  list({ skip, take, current, pageSize }: PageOption, { name }: Partial<Pick<UserRoleModel, 'name'>>) {
    const where = useTransfrormQuery({ name }, { name: 'like' })
    return findAndCount(this.roleRepository.findAndCount({ where, skip, take }), { current, pageSize })
  }

  all() {
    return this.roleRepository.find()
  }

  detail(id: number) {
    return this.roleRepository.findOneBy({ id })
  }

  create({ name, code }: Pick<UserRoleModel, 'name' | 'code'>) {
    return this.roleRepository.save({ name, code })
  }

  update(id: number, { name, code }: Partial<Pick<UserRoleModel, 'name' | 'code'>>) {
    return this.roleRepository.update({ id }, { name, code })
  }

  delete(id: number) {
    return useAffected(this.roleRepository.delete({ id }))
  }

  permission(id: number, { permissions }: Pick<UserRoleModel, 'permissions'>) {
    return useAffected(this.roleRepository.update({ id }, { permissions }))
  }
}
