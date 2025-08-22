/**
 * model 基础字段类
 * CreateDateColumn, UpdateDateColumn 不能使 dataString 生效
 */
class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ comment: '创建时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @Column({ comment: '最后修改时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: string
}

/**
 * model 地址基础字段类
 */
class AddressModel extends BaseModel {
  @Column({ comment: '省份', length: 16, nullable: true })
  province: string

  @Column({ comment: '城市', length: 16, nullable: true })
  city: string

  @Column({ comment: '省份', length: 16, nullable: true })
  district: string

  @Column({ comment: '详细地址', length: 16, nullable: true })
  address: string

  @Column({ comment: '联系人', length: 16, nullable: true })
  name: string

  @Column({ length: 12, comment: '手机号', nullable: true })
  mobile: string

  @AfterLoad()
  formatMobile() {
    useFormatMobile.call(this)
  }
}

export { BaseModel, AddressModel }
