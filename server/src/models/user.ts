import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
// import { UserDetailModel } from './user-detail'

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

  // @OneToOne(() => UserDetailModel, photo => photo.user)
  // user: UserDetailModel
}
