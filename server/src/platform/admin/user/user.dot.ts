/**
 * 迁移日志验证器
 */
export class UpdateUserAdminDto {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: number
}

/**
 * 用户查询验证
 */
export class UserDto extends PagingDot {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  mobile?: string

  @IsOptional()
  @IsString({ each: true })
  createdAt?: string[]
}

/**
 * 创建黑名单
 */
export class CreateBlocklistDto {
  @IsInt()
  id: number

  @IsString()
  reason: string
}

/**
 * 用户查询验证
 */
export class BlocklistDto extends PagingDot {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  mobile?: string

  @IsOptional()
  @IsString()
  reason?: string
}
