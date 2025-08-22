import { MenuModel } from '@/models/menu'
import { PermissionType } from './enums'

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

  detail(id: number) {
    return this.menuRepository.findOneBy({ id })
  }

  private async findSameContent(content?: string, type?: string, parentId?: number) {
    const isExist = await this.menuRepository.existsBy({ content, type, parentId: parentId || undefined })
    if (isExist) throw new BizException(`相同类型下 \`${content}\` 已存在`)
    if (parentId) {
      const parent = await this.menuRepository.findOneBy({ id: parentId })
      if (!parent) throw new BizException(`父级不存在`)

      switch (parent.type) {
        case PermissionType.Module:
          if (type !== PermissionType.Page) throw new BizException(`模块下只能创建页面`)
          break
        case PermissionType.Page:
          if (type !== PermissionType.Action) throw new BizException(`页面下只能创建行为`)
          break
        case PermissionType.Action:
          throw new BizException(`行为下不能创建`)
      }
    }
  }

  async create({ name, content, type, parentId }: Pick<MenuModel, 'name' | 'content' | 'type'> & { parentId: number }) {
    await this.findSameContent(content, type, parentId)
    if (parentId) {
      return this.menuRepository.save({ name, content, type, parent: { id: parentId } })
    } else {
      return this.menuRepository.insert({ name, content, type })
    }
  }

  async update(id: number, { name, content, type }: Partial<Pick<MenuModel, 'name' | 'content' | 'type'>>) {
    await this.findSameContent(content, type)
    return useAffected(this.menuRepository.update({ id }, { name, content }))
  }

  delete(id: number) {
    return useAffected(this.menuRepository.delete({ id }))
  }
}
