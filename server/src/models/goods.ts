import type { Relation } from 'typeorm'

@Entity('goods')
export class GoodsModel extends BaseModel {
  @Column({ length: 64, comment: '商品名称' })
  name: string

  @Column({ type: 'json', comment: '商品图片' })
  photos: string[]

  @Column({ length: 256, comment: '商品视频', nullable: true })
  video: string

  @Column({ type: 'text', comment: '商品描述' })
  desc: string

  @Column({ comment: '是否上架, true-上架, false-下架', default: false })
  onsale: boolean

  @Column({ comment: '销售数量', default: 0 })
  saleNum: number

  @Column({ type: 'decimal', comment: '默认价格', precision: 10, scale: 2 })
  defaultPrice: number

  @Column({ length: 32, comment: '默认SKU' })
  defaultSku: string

  @Column({ comment: '分类ID' })
  categoryId: number

  @ManyToOne(() => GoodsCategoryModel, category => category.products)
  @JoinColumn()
  category: Relation<GoodsCategoryModel>

  @OneToMany(() => GoodsSpecModel, spec => spec.product)
  specs: Relation<GoodsSpecModel[]>
}

@Entity('goods_category')
@Tree('nested-set')
export class GoodsCategoryModel extends BaseModel {
  @Column({ length: 32, comment: '分类名称' })
  name: string

  @Column({ comment: '分类排序' })
  sort: number

  @Column({ nullable: true })
  parentId: number

  @TreeParent({ onDelete: 'CASCADE' })
  parent: GoodsCategoryModel

  @TreeChildren({ cascade: true })
  children: GoodsCategoryModel[]

  @OneToMany(() => GoodsModel, goods => goods.category)
  products: Relation<GoodsModel[]>
}

interface Attr {
  label: string
  value: string
}

@Entity('goods_spec')
export class GoodsSpecModel extends BaseModel {
  @Column({ length: 32, comment: 'SKU', unique: true })
  sku: string

  @Column({ type: 'json', comment: '属性' })
  attrs: Attr[]

  @Column({ length: 256, comment: '图片' })
  photo: string

  @Column({ type: 'decimal', comment: '价格', precision: 10, scale: 2 })
  price: number

  @Column({ comment: '库存', default: 0 })
  stock: number

  @Column({ comment: '库存占用', default: 0 })
  hold: number

  @ManyToOne(() => GoodsModel, goods => goods.specs)
  @JoinColumn()
  product: Relation<GoodsModel>
}
