export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ comment: '最后修改时间', type: 'timestamp' })
  updatedAt: Date
}
