interface RecordType {
  id: number
  parentId: number
  children?: RecordType[]
}

@Injectable()
export class MenuService {
  @InjectRepository(MenuModel)
  private menuRepository: Repository<MenuModel>

  groupItems(list: RecordType[], group: Record<number, RecordType[]>) {
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

  async list({ skip, take, current, pageSize }: PageOption, { name, createdAt }) {
    const where = useTransfrormQuery({ name, createdAt }, { name: 'like', createdAt: 'between' })
    const result = await findAndCount(this.menuRepository.findAndCount({ where, skip, take }), { current, pageSize })
    const group = Object.groupBy(result.items, item => item.parentId) as Record<number, RecordType[]>
    result.items = this.groupItems(group[0] as RecordType[], group)
    return result
  }
  create({ name, content, type, parentId }) {
    return this.menuRepository.save({ name, content, type, parentId })
  }
  update(id, { name, content }) {
    return this.menuRepository.update({ id }, { name, content })
  }
}
