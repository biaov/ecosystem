import type { Relation } from 'typeorm'

@Entity('user')
export class UserModel extends BaseModel {
  @Column({ length: 32, comment: '用户名' })
  username: string

  @Column({ length: 64, comment: '密码' })
  password: string

  @OneToOne(() => UserDetailModel, user => user.user, { cascade: true })
  user: Relation<UserDetailModel>
}

@Entity('user_admin')
export class UserAdminModel extends BaseModel {
  @Column({ length: 32, comment: '用户名' })
  username: string

  @Column({ length: 64, comment: '密码', default: '' })
  password: string

  @OneToOne(() => UserDetailModel, user => user.userAdmin, { cascade: true })
  user: Relation<UserDetailModel>
}

@Entity('user_role')
export class UserRoleModel extends BaseModel {
  @Column({ length: 24, comment: '名称' })
  name: string

  @Column({ length: 64, comment: '状态码', unique: true })
  code: string

  @OneToMany(() => UserPermissionModel, userPermission => userPermission.userRole, { cascade: true })
  permissions: Relation<UserPermissionModel[]>
}

@Entity('user_detail')
export class UserDetailModel extends BaseModel {
  @Column({ length: 32, comment: '用户名', unique: true })
  username: string

  @Column({ length: 32, comment: '昵称', nullable: true })
  nickname: string

  @Column({ length: 32, comment: '邮箱', nullable: true })
  email: string

  @Column({ length: 128, comment: '头像', nullable: true })
  avatar: string

  @Column({ length: 12, comment: '手机号', nullable: true, unique: true })
  mobile: string

  @Column({ comment: '性别: 0 - 女, 1 - 男, 2 - 保密', default: 2, type: 'tinyint' })
  gender: number

  @Column({ length: 12, comment: '权限码', nullable: true })
  roleCode: string

  @Column({ comment: '注册来源: 1 - PC 官网, 2 - H5 端, 3 - APP 端, 4 - PC 管理后台, 5 - 微信小程序端', nullable: false, type: 'tinyint' })
  source: number

  @OneToOne(() => UserModel)
  @JoinColumn()
  user: Relation<UserModel>

  @OneToOne(() => UserAdminModel)
  @JoinColumn()
  userAdmin: Relation<UserAdminModel>
}

@Entity('user_permission')
export class UserPermissionModel extends BaseModel {
  @Column({ length: 32, comment: '权限内容, 模块:页面:行为', unique: true })
  content: string

  @ManyToOne(() => UserRoleModel)
  @JoinColumn()
  userRole: Relation<UserRoleModel>
}
