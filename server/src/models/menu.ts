@Entity('menu')
export class MenuModel extends BaseModel {
  @Column({ length: 32, comment: '权限名称' })
  name: string

  @Column({ length: 64, comment: '权限内容, 模块标识 | 页面标识 | 行为标识' })
  content: string

  @Column({ length: 8, comment: '权限类型, module:模块 | page:页面 | action:行为' })
  type: string

  @Column({ comment: '父级ID', default: 0 })
  parentId: number
}
