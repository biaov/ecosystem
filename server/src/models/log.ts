@Entity('migrations')
export class MigrationsModel extends BaseModel {
  @Column({ length: 32, comment: '名称' })
  name: string
}

@Entity('log')
export class LogModel extends BaseModel {
  @Column({ length: 32, comment: '昵称' })
  nickname: string

  @Column({ length: 32, comment: '操作模块' })
  module: string

  @Column({ length: 32, comment: '操作IP' })
  ip: string

  @Column({ length: 64, comment: '操作内容' })
  content: string
}
