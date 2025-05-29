import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
// import { UserModel } from './user'

@Entity('user_detail')
export class UserDetailModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 32, comment: '用户名' })
  username: string

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ comment: '最后修改时间', type: 'timestamp' })
  updatedAt: Date

  // @OneToOne(() => UserModel)
  // @JoinColumn()
  // user: UserModel
}
