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
