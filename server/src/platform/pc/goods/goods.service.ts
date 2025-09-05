import { GoodsModel, GoodsCategoryModel, GoodsSpecModel } from '@/models/goods'

@Injectable()
export class GoodsService {
  @InjectRepository(GoodsModel)
  private goodsRepository: Repository<GoodsModel>

  async list({ skip, take, current, pageSize }: PageOption, { name, sku, categoryId, onsale }: Partial<Pick<GoodsModel, 'name' | 'categoryId' | 'onsale'> & { sku: string }>) {
    return findAndCount(
      this.goodsRepository
        .createQueryBuilder('goods')
        .leftJoinAndSelect('goods.specs', 'spec')
        .where(useTransfrormQuery({ name, categoryId, onsale }, { name: 'like', sku: 'like' }))
        .andWhere(...useTransfrormQuery<[string, {}]>({ 'spec.sku': sku }, { 'spec.sku': 'like' }))
        .skip(skip)
        .take(take)
        .orderBy('goods.createdAt', 'DESC')
        .getManyAndCount(),
      { current, pageSize }
    )
  }
  detail(id: number) {
    return this.goodsRepository.findOne({ where: { id }, relations: ['category', 'specs'] })
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
}
