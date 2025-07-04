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
  private menuRepository: TreeRepository<MenuModel>

  private filterChidren(list: Partial<MenuModel>[]) {
    return list.map(item => {
      if (item.children?.length) {
        item.children = this.filterChidren(item.children) as MenuModel[]
      } else {
        delete item.children
      }
      return item
    })
  }

  async all() {
    const result = await this.menuRepository.findTrees()
    return this.filterChidren(result)
  }

  private async findSameContent(content?: string, type?: string) {
    const isExist = await this.menuRepository.findOneBy({ content, type })
    if (isExist) throw new BizException(`相同权限类型下 \`${content}\` 已存在`)
  }

  async create({ name, content, type, parentId }: Pick<MenuModel, 'name' | 'content' | 'type'> & { parentId: number }) {
    await this.findSameContent(content, type)
    return this.menuRepository.save({ name, content, type, parentId })
  }

  async update(id: number, { name, content, type }: Partial<Pick<MenuModel, 'name' | 'content' | 'type'>>) {
    await this.findSameContent(content, type)
    return this.menuRepository.update({ id }, { name, content })
  }

  delete(id: number) {
    return useAffected(this.menuRepository.delete({ id }))
  }
}
