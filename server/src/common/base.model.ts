/**
 * model 基础字段类
 * CreateDateColumn, UpdateDateColumn 不能使 dataString 生效
 */
abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ comment: '创建时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @Column({ comment: '最后修改时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: true })
  updatedAt: string
}

export { BaseModel }
