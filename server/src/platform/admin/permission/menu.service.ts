import { MenuModel } from '@/models/menu'
import { PermissionType } from './enums'

interface RecordType {
  id: number
  parentId: number
  children?: RecordType[]
}

@Injectable()
export class MenuService {
  @InjectRepository(MenuModel)
  private menuRepository: Repository<MenuModel>

  private groupItems(list: RecordType[], group: Record<number, RecordType[]>) {
    return list.map(item => {
      const child = group[item.id]
      if (child) {
        item.children = this.groupItems(child, group)
      } else {
        delete item.children
      }
      return item
    })
  }

  private groups(list: MenuModel[]) {
    const group = Object.groupBy(list, item => item.parentId) as Record<number, RecordType[]>

    return this.groupItems((group['0'] || Object.values(group)[0]) as RecordType[], group) as Record<string, any>[]
  }

  async list({ skip, take, current, pageSize }: PageOption, { name, createdAt }: Partial<Pick<MenuModel, 'name' | 'createdAt'>>) {
    const where = useTransfrormQuery({ name, createdAt }, { name: 'like', createdAt: 'between' })
    const result = await findAndCount(this.menuRepository.findAndCount({ where, skip, take }), { current, pageSize })
    result.items = this.groups(result.items)
    return result
  }

  async all() {
    const result = await this.menuRepository.find()
    return this.groups(result)
  }

  private async findSameContent(content?: string, type?: string, parentId?: number) {
    const isExist = await this.menuRepository.findOneBy({ content, type, parentId })
    if (isExist) throw new BizException(`相同权限类型下 \`${content}\` 已存在`)
  }

  async create({ name, content, type, parentId }: Pick<MenuModel, 'name' | 'content' | 'type' | 'parentId'>) {
    await this.findSameContent(content, type, parentId)
    return this.menuRepository.save({ name, content, type, parentId })
  }

  async update(id: number, { name, content, type, parentId }: Partial<Pick<MenuModel, 'name' | 'content' | 'type' | 'parentId'>>) {
    await this.findSameContent(content, type, parentId)
    return this.menuRepository.update({ id }, { name, content })
  }

  delete(id: number) {
    return useDeleteHandle(this.menuRepository.delete({ id }))
  }
}
