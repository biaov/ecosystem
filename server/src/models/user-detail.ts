import { UserAdminModel, UserModel } from './user'

@Entity('user_detail')
export class UserDetailModel {
  @PrimaryGeneratedColumn('increment')
  id: number

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

  @Column({ comment: '注册来源: pc - PC 官网, h5 - H5 端, app - APP 端, admin - PC 管理后台, wechat - 微信小程序端', nullable: false, type: 'tinyint' })
  source: number

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ comment: '最后修改时间', type: 'timestamp' })
  updatedAt: Date

  @OneToOne(() => UserModel)
  @JoinColumn()
  user: UserModel

  @OneToOne(() => UserAdminModel)
  @JoinColumn()
  userAdmin: UserAdminModel
}
