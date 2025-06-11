/**
 * model 基础字段类
 * CreateDateColumn, UpdateDateColumn 不能使 dataString 生效
 */
export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ comment: '创建时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ comment: '最后修改时间', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: true })
  updatedAt: Date
}
