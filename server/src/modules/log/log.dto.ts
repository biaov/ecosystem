/**
 * 日志验证器
 */
export class LogDto extends PagingDot {
  @IsString({ message: '名称必须是字符串' })
  name?: string

  @IsString({ message: '时间必须是字符串' })
  createdAt?: string
}
