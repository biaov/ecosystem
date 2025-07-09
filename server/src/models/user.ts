import type { Relation } from 'typeorm'

export abstract class UserInfo extends BaseModel {
  @Column({ length: 32, comment: '用户名', unique: true })
  username: string

  @Column({ length: 64, comment: '密码', select: false })
  password: string

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

  @Column({ comment: '注册来源: 1 - PC 官网, 2 - H5 端, 3 - APP 端, 4 - PC 管理后台, 5 - 微信小程序端', nullable: false, type: 'tinyint' })
  source: number

  @AfterLoad()
  formatMobile() {
    this.mobile && (this.mobile = this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
    this.username && (this.username = this.username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
  }
}

@Entity('user')
export class UserModel extends UserInfo {
  @Column({ comment: '是否黑名单,false-正常,true-拉黑名单', default: false })
  blocklist: boolean

  @Column({ length: 64, comment: '黑名单原因', nullable: true })
  reason: string
}

@Entity('user_admin')
export class UserAdminModel extends UserInfo {
  @Column({ comment: '角色 ID' })
  roleId: number

  @ManyToOne(() => UserRoleModel, role => role.users)
  @JoinColumn()
  role: Relation<UserRoleModel>
}

@Entity('user_role')
export class UserRoleModel extends BaseModel {
  @Column({ length: 24, comment: '名称' })
  name: string

  @Column({ type: 'json', comment: '权限内容, *,页面:行为,模块:页面:行为', nullable: true })
  permissions: string[]

  @OneToMany(() => UserAdminModel, user => user.role)
  users: Relation<UserAdminModel[]>

  @AfterLoad()
  getPermissions() {
    !this.permissions && (this.permissions = [])
  }
}
