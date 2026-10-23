@Entity('user_cart')
export class CartModel extends BaseModel {
  @Column({ comment: '用户 ID' })
  userId: number

  @Column({ comment: '商品 ID' })
  goodsId: number

  @Column({ length: 32, comment: 'SKU' })
  sku: string

  @Column({ comment: '数量', default: 1 })
  quantity: number

  @Column({ comment: '是否选中', default: true })
  checked: boolean
}
