import { UserDetailModel } from './user-detail'

const separator = '-biaov-'

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, comment: '用户名' })
  username: string

  @Column({ length: 64, comment: '密码' })
  password: string

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ comment: '最后修改时间', type: 'timestamp' })
  updatedAt: Date

  @OneToOne(() => UserDetailModel, user => user.user)
  user: UserDetailModel
}

@Entity('user_admin')
export class UserAdminModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, comment: '用户名' })
  username: string

  @Column({ length: 64, comment: '密码' })
  password: string

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ comment: '最后修改时间', type: 'timestamp' })
  updatedAt: Date

  @OneToOne(() => UserDetailModel, user => user.user)
  user: UserDetailModel
}

@Entity('user_role')
export class UserRoleModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 24, comment: '名称' })
  name: string

  @Column({ length: 64, comment: '状态码', unique: true })
  code: string

  @Column({ comment: '权限', type: 'text', nullable: true })
  _permissions: string

  constructor(value: string[]) {
    this.permissions = value
  }

  set permissions(value: string[]) {
    this._permissions = (value ?? []).join(separator)
  }

  get permissions(): string[] {
    return (this._permissions ?? '').split(separator)
  }

  // @BeforeInsert()
  // @BeforeUpdate()
  // formatPermissions() {
  //   // this._permissions = this._permissions
  // }

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ comment: '最后修改时间', type: 'timestamp' })
  updatedAt: Date
}
