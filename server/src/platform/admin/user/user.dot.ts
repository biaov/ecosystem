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
