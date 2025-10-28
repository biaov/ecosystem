/**
 * 手机号绑定验证器
 */
export class BindMobileDot {
  @IsPhoneNumber('CN')
  @IsNotEmpty()
  @IsString()
  mobile: string

  @IsNotEmpty()
  @IsString()
  code: string
}

/**
 * 验证邮箱验证器
 */
export class VerifyEmailDot {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  code: string
}

/**
 * 验证用户更新信息验证器
 */
export class VerifyUserUpdateDot {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: number
}

/**
 * 验证用户更新密码验证器
 */
export class VerifyPasswordDot {
  @IsNotEmpty()
  @IsString()
  oPassword: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  cPassword: string
}
