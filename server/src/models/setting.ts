@Entity('setting')
export class SettingModel extends BaseModel {
  @Column({ length: 16, comment: '设置钥匙' })
  key: string

  @Column({ type: 'json', comment: '设置的值' })
  value: any
}
