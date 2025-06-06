import { UserDetailModel } from './user-detail'

const separator = '-biaov-'

@Entity('user')
export class UserModel extends BaseModel {
  @Column({ length: 32, comment: '用户名' })
  username: string

  @Column({ length: 64, comment: '密码' })
  password: string

  @OneToOne(() => UserDetailModel, user => user.user, { cascade: true })
  user: UserDetailModel
}

@Entity('user_admin')
export class UserAdminModel extends BaseModel {
  @Column({ length: 32, comment: '用户名' })
  username: string

  @Column({ length: 64, comment: '密码' })
  password: string

  @OneToOne(() => UserDetailModel, user => user.userAdmin, { cascade: true })
  user: UserDetailModel
}

@Entity('user_role')
export class UserRoleModel extends BaseModel {
  @Column({ length: 24, comment: '名称' })
  name: string

  @Column({ length: 64, comment: '状态码', unique: true })
  code: string

  @Column({ comment: '权限', type: 'text', nullable: true })
  _permissions: string

  set permissions(value: string[]) {
    this._permissions = (value ?? []).join(separator)
  }

  get permissions(): string[] {
    return (this._permissions ?? '').split(separator)
  }

  @BeforeInsert()
  @BeforeUpdate()
  formatPermissions() {
    this._permissions = this.permissions.join(separator)
  }
}
