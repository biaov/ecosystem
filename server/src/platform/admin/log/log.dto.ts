/**
 * 操作日志验证器
 */
export class LogDto extends PagingDot {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  module?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsString({ each: true })
  createdAt?: string[]

  @IsOptional()
  @IsString()
  ip?: string
}

/**
 * 迁移日志验证器
 */
export class MigrationLogDto extends PagingDot {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string
}
