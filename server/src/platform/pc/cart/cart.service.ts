@Injectable()
export class CartService {
  @InjectRepository(CartModel)
  private cartRepository: Repository<CartModel>
  @InjectRepository(GoodsModel)
  private goodsRepository: Repository<GoodsModel>
  @InjectRepository(GoodsSpecModel)
  private goodsSpecRepository: Repository<GoodsSpecModel>

  async list(userId: number) {
    const carts = (await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndMapOne('cart.goods', GoodsModel, 'goods', 'goods.id = cart.goodsId')
      .leftJoinAndMapOne('cart.spec', GoodsSpecModel, 'spec', 'spec.sku = cart.sku')
      .where('cart.userId = :userId', { userId })
      .orderBy('cart.createdAt', 'DESC')
      .getMany()) as (CartModel & { goods?: GoodsModel; spec?: GoodsSpecModel })[]

    return carts.map(({ id, goodsId, sku, quantity, checked, goods, spec }) => ({
      id,
      goodsId,
      sku,
      quantity,
      checked,
      name: goods?.name || '',
      photo: spec?.photo || goods?.photos?.[0] || '',
      price: spec?.price || 0,
      stock: spec?.stock || 0,
      attrs: spec?.attrs || []
    }))
  }

  async create(userId: number, { goodsId, sku, quantity }: { goodsId: number; sku: string; quantity: number }) {
    const spec = await this.goodsSpecRepository.findOneBy({ sku })
    if (!spec) throw new BizException('商品规格不存在')
    const goods = await this.goodsRepository.findOneBy({ id: goodsId })
    if (!goods) throw new BizException('商品不存在')

    const exist = await this.cartRepository.findOneBy({ userId, sku })
    if (exist) {
      exist.quantity += quantity
      await this.cartRepository.save(exist)
    } else {
      await this.cartRepository.save({ userId, goodsId, sku, quantity })
    }
    return true
  }

  async update(userId: number, id: number, { quantity, checked }: { quantity?: number; checked?: boolean }) {
    const cart = await this.cartRepository.findOneBy({ id, userId })
    if (!cart) throw new BizException('购物车记录不存在')
    quantity !== undefined && (cart.quantity = quantity)
    checked !== undefined && (cart.checked = checked)
    await this.cartRepository.save(cart)
    return true
  }

  async delete(userId: number, id: number) {
    return useAffected(this.cartRepository.delete({ id, userId }), '删除失败')
  }

  async selectAll(userId: number, checked: boolean) {
    return useAffected(this.cartRepository.update({ userId }, { checked }), '操作失败')
  }
}
