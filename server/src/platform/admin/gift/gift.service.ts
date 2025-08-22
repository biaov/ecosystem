import { GiftModel, GiftCategoryModel } from '@/models/gift'

type GiftCreate = Pick<GiftModel, 'categoryId' | 'name' | 'onsale' | 'photos' | 'sku' | 'desc' | 'credit' | 'stock' | 'recommend' | 'newest' | 'preferential'>

@Injectable()
export class GiftService {
  @InjectRepository(GiftModel)
  private giftRepository: Repository<GiftModel>

  private async existSku(sku: string) {
    const skuExist = await this.giftRepository.existsBy({ sku })
    if (skuExist) throw new BizException(`SKU已存在`)
  }

  list(
    { skip, take, current, pageSize }: PageOption,
    { name, sku, categoryId, onsale, recommend, newest, preferential }: Partial<Pick<GiftModel, 'name' | 'categoryId' | 'onsale' | 'recommend' | 'newest' | 'preferential'> & { sku: string }>
  ) {
    const where = useTransfrormQuery({ name, categoryId, onsale, sku, recommend, newest, preferential }, { name: 'like', sku: 'like' })
    return findAndCount(
      this.giftRepository.findAndCount({
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
    return this.giftRepository.findOne({ where: { id }, relations: ['category'] })
  }
  async create({ categoryId, name, onsale, photos, desc, sku, recommend, newest, preferential }: GiftCreate) {
    await this.existSku(sku)
    return await this.giftRepository.save({ categoryId, name, onsale, photos, sku, desc, recommend, newest, preferential })
  }
  update(id: number, { categoryId, name, onsale, photos, desc, sku, recommend, newest, preferential }: Partial<GiftCreate>) { 
    return useAffected(this.giftRepository.update(id, { categoryId, name, sku, onsale, photos, desc, recommend, newest, preferential }))
  }
  delete(id: number) {
    return useAffected(this.giftRepository.delete({ id }))
  }
  betachUpdate(specs: Pick<GiftModel, 'sku' | 'stock'>[]) {
    return useAffected(Promise.all(specs.filter(item => item.sku).map(({ sku, stock }) => this.giftRepository.update({ sku: `${sku}` }, { stock: stock || 0 }))))
  }
}
@Injectable()
export class GiftCategoryService {
  @InjectRepository(GiftCategoryModel)
  private giftCategoryRepository: TreeRepository<GiftCategoryModel>

  all() {
    return this.giftCategoryRepository.find()
  }

  detail(id: number) {
    return this.giftCategoryRepository.findOneBy({ id })
  }

  create({ name, sort }: Pick<GiftCategoryModel, 'name' | 'sort'>) {
    return this.giftCategoryRepository.save({ name, sort })
  }

  update(id: number, { name, sort }: Partial<Pick<GiftCategoryModel, 'name' | 'sort'>>) {
    return useAffected(this.giftCategoryRepository.update({ id }, { name, sort }))
  }

  delete(id: number) {
    return useAffected(this.giftCategoryRepository.delete({ id }))
  }
}
