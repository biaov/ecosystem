import type { Relation } from 'typeorm'

@Entity('gift')
export class GiftModel extends BaseModel {
  @Column({ length: 64, comment: '礼品名称' })
  name: string

  @Column({ length: 32, comment: 'SKU, 礼品编码', unique: true })
  sku: string

  @Column({ comment: '库存', default: 0 })
  stock: number

  @Column({ comment: '库存占用', default: 0 })
  hold: number

  @Column({ type: 'json', comment: '礼品图片' })
  photos: string[]

  @Column({ comment: '推荐标签', default: false })
  recommend: boolean

  @Column({ comment: '新品标签', default: false })
  newest: boolean

  @Column({ comment: '特惠标签', default: false })
  preferential: boolean

  @Column({ type: 'text', comment: '礼品描述' })
  desc: string

  @Column({ comment: '是否上架, true-上架, false-下架', default: false })
  onsale: boolean

  @Column({ comment: '销售数量', default: 0 })
  saleNum: number

  @Column({ comment: '兑换积分', default: 0 })
  credit: number

  @Column({ comment: '分类ID' })
  categoryId: number

  @ManyToOne(() => GiftCategoryModel, category => category.gifts)
  @JoinColumn()
  category: Relation<GiftCategoryModel>
}

@Entity('gift_category')
export class GiftCategoryModel extends BaseModel {
  @Column({ length: 32, comment: '分类名称' })
  name: string

  @Column({ comment: '分类排序' })
  sort: number

  @OneToMany(() => GiftModel, gift => gift.category)
  gifts: Relation<GiftModel[]>
}
