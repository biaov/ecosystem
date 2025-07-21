import { GoodsModel, GoodsCategoryModel, GoodsSpecModel } from '@/models/goods'

type GoodsCreate = Pick<GoodsModel, 'categoryId' | 'name' | 'onsale' | 'photos' | 'defaultSku' | 'desc'> & { video?: string } & {
  specs: (Pick<GoodsSpecModel, 'sku' | 'price' | 'attrs' | 'photo'> & { id?: number })[]
}

@Injectable()
export class GoodsService {
  @InjectRepository(GoodsModel)
  private goodsRepository: Repository<GoodsModel>
  @InjectRepository(GoodsSpecModel)
  private goodsSpecRepository: Repository<GoodsSpecModel>

  private findDefaultPrice({ defaultSku, specs }: Pick<GoodsCreate, 'defaultSku' | 'specs'>) {
    const defaultPrice = specs.find(item => item.sku === defaultSku)?.price
    if (!defaultPrice && defaultPrice !== 0) throw new BizException('默认SKU不存在')
    return defaultPrice
  }

  private async existSku(specs: Pick<GoodsSpecModel, 'sku' | 'price' | 'attrs' | 'photo'>[]) {
    if (!specs.length) return
    const skuExist = await this.goodsSpecRepository.existsBy(specs.map(({ sku }) => ({ sku })))
    if (skuExist) throw new BizException(`SKU已存在`)
  }

  list({ skip, take, current, pageSize }: PageOption, { name, sku, categoryId, onsale }: Partial<Pick<GoodsModel, 'name' | 'categoryId' | 'onsale'> & { sku: string }>) {
    const where = useTransfrormQuery({ name, categoryId, onsale }, { name: 'like', sku: 'like' })
    // return findAndCount(
    //   this.goodsRepository
    //     .createQueryBuilder('goods')
    //     .orderBy({ 'goods.createdAt': 'DESC' })
    //     .leftJoinAndSelect('goods.specs', 'spec')
    //     .where(where)
    //     .where('spec.sku = :sku', { sku: sku || undefined })
    //     .skip(skip)
    //     .take(take)
    //     .getManyAndCount(),
    //   { current, pageSize }
    // )
    return findAndCount(
      this.goodsRepository.findAndCount({
        where,
        skip,
        take,
        order: {
          createdAt: 'DESC'
        },
        relations: ['category']
      }),
      { current, pageSize }
    )
  }
  detail(id: number) {
    return this.goodsRepository.findOne({ where: { id }, relations: ['category', 'specs'] })
  }
  async create({ categoryId, name, onsale, photos, specs, desc, defaultSku }: GoodsCreate) {
    const defaultPrice = this.findDefaultPrice({ defaultSku, specs })
    await this.existSku(specs)
    const goods = await this.goodsRepository.save({ categoryId, name, onsale, photos, defaultSku, defaultPrice, desc })
    goods.specs = await this.goodsSpecRepository.save(specs.map(item => ({ ...item, product: { id: goods.id } })))
    return goods
  }
  private async existGoods(id: number) {
    const goods = await this.detail(id)
    if (!goods) throw new BizException('商品不存在')
    return goods
  }
  async update(id: number, { categoryId, name, onsale, photos, specs, desc, defaultSku }: GoodsCreate) {
    const defaultPrice = this.findDefaultPrice({ defaultSku, specs })
    const existIdSpecs: Required<GoodsCreate['specs'][number]>[] = []
    const newSpecs = specs.filter(item => {
      item.id && existIdSpecs.push(item as Required<GoodsCreate['specs'][number]>)
      return !item.id
    })
    await this.existSku(newSpecs)
    const goods = await this.existGoods(id)
    // 删除旧规格
    const skus = specs.map(item => item.sku)
    const oldSpecsIds = goods.specs.filter(item => !skus.includes(item.sku)).map(({ id }) => id)
    oldSpecsIds.length && (await useAffected(this.goodsSpecRepository.delete(oldSpecsIds)))

    // 创建新规格
    newSpecs.length && (await this.goodsSpecRepository.save(newSpecs.map(item => ({ ...item, product: { id } }))))

    // 更新商品和商品规格
    return useAffected(
      Promise.all([...existIdSpecs.map(item => this.goodsSpecRepository.update(item.id, item)), this.goodsRepository.update(id, { categoryId, name, onsale, photos, desc, defaultPrice })])
    )
  }

  updateOnsale(id: number, { onsale }: Pick<GoodsModel, 'onsale'>) {
    return useAffected(this.goodsRepository.update(id, { onsale }))
  }

  async delete(id: number) {
    const goods = await this.existGoods(id)
    await useAffected(this.goodsSpecRepository.delete(goods.specs.map(({ id }) => id)))
    return useAffected(this.goodsRepository.delete({ id }))
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

@Injectable()
export class GoodsStockService {
  @InjectRepository(GoodsSpecModel)
  private goodsSpecRepository: TreeRepository<GoodsSpecModel>

  list({ skip, take, current, pageSize }: PageOption, { name, sku, categoryId, onsale }: Partial<Pick<GoodsModel, 'name' | 'categoryId' | 'onsale'> & { sku: string }>) {
    const where = useTransfrormQuery({ sku }, { sku: 'like' })
    where.product = useTransfrormQuery({ name }, { name: 'like' }) as Record<string, string | FindOperator<string>>

    return findAndCount(
      this.goodsSpecRepository.findAndCount({
        where,
        skip,
        take,
        order: {
          createdAt: 'DESC'
        },
        relations: ['product']
      }),
      { current, pageSize }
    )
  }
  detail(id: number) {
    return this.goodsSpecRepository.findOneBy({ id })
  }

  update(id: number, { stock }: Partial<Pick<GoodsSpecModel, 'stock'>>) {
    return useAffected(this.goodsSpecRepository.update({ id }, { stock }))
  }
  betachUpdate(specs: Pick<GoodsSpecModel, 'sku' | 'stock'>[]) {
    return useAffected(Promise.all(specs.filter(item => item.sku).map(({ sku, stock }) => this.goodsSpecRepository.update({ sku: `${sku}` }, { stock: stock || 0 }))))
  }
}
