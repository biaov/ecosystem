import { GoodsModel, GoodsCategoryModel } from '@/models/goods'

@Injectable()
export class GoodsService {
  @InjectRepository(GoodsModel)
  private goodsRepository: Repository<GoodsModel>

  list({ skip, take, current, pageSize }: PageOption, { name, sku, categoryId, onsale }: Partial<Pick<GoodsModel, 'name' | 'categoryId' | 'onsale'> & { sku: string }>) {
    const where = useTransfrormQuery({ name, sku, categoryId, onsale }, { name: 'like', sku: 'like', onsale: 'like' })
    return findAndCount(
      this.goodsRepository.findAndCount({
        where,
        skip,
        take,
        order: {
          createdAt: 'DESC'
        }
      }),
      { current, pageSize }
    )
  }
}

@Injectable()
export class GoodsCategoryService {
  @InjectRepository(GoodsCategoryModel)
  private goodsCategoryRepository: TreeRepository<GoodsCategoryModel>

  private filterChidren(list: Partial<GoodsCategoryModel>[]) {
    return list.map(item => {
      if (item.children?.length) {
        item.children = this.filterChidren(item.children) as GoodsCategoryModel[]
      } else {
        delete item.children
      }
      return item
    })
  }

  async all() {
    const result = await this.goodsCategoryRepository.findTrees()
    return this.filterChidren(result)
  }

  detail(id: number) {
    return this.goodsCategoryRepository.findOneBy({ id })
  }

  private async findSameContent(name?: string, parentId?: number) {
    const isExist = await this.goodsCategoryRepository.existsBy({ name, parentId: parentId || undefined })
    if (isExist) throw new BizException(`同级别 \`${name}\` 已存在`)
    if (!parentId) return
    const parent = await this.goodsCategoryRepository.findOneBy({ id: parentId })
    if (!parent) throw new BizException(`父级不存在`)
  }

  async create({ name, parentId, sort }: Pick<GoodsCategoryModel, 'name' | 'parentId' | 'sort'>) {
    await this.findSameContent(name, parentId)
    if (parentId) {
      return this.goodsCategoryRepository.save({ name, sort, parent: { id: parentId } })
    } else {
      return this.goodsCategoryRepository.insert({ name, sort })
    }
  }

  async update(id: number, { name, sort, parentId }: Partial<Pick<GoodsCategoryModel, 'name' | 'parentId' | 'sort'>>) {
    name && (await this.findSameContent(name, parentId))
    return useAffected(this.goodsCategoryRepository.update({ id }, { name, sort }))
  }

  delete(id: number) {
    return useAffected(this.goodsCategoryRepository.delete({ id }))
  }
}
