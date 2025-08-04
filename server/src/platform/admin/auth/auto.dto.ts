/**
 * 登录验证器
 */
export class LoginDto {
  @MaxLength(11, { message: '用户名长度不能超过11个字符' })
  @MinLength(4, { message: '用户名长度不能小于4个字符' })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @MaxLength(32, { message: '密码长度不能超过32个字符' })
  @MinLength(6, { message: '密码长度不能小于6个字符' })
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @IsString()
  @IsNotEmpty()
  type: string
}

class Code {
  @IsString({ message: 'code.id 必需是字符串' })
  @IsNotEmpty({ message: 'code.id 必传' })
  id: string

  @IsString({ message: 'code.value 必需是字符串' })
  @IsNotEmpty({ message: 'code.value 必传' })
  value: string
}

/**
 * 手机号登录
 */
export class MobileLoginDto {
  @IsString({ message: '手机号必须是字符串' })
  @IsNotEmpty({ message: '手机号不能为空' })
  username: string

  @ValidateNested()
  @Type(() => Code)
  @IsNotEmpty({ message: 'code 必传' })
  code: Code

  @IsString()
  @IsNotEmpty()
  type: string
}

/**
 * 注册验证器
 */
export class RegisterDto {
  @MaxLength(11, { message: '用户名长度不能超过12个字' })
  @MinLength(4, { message: '用户名长度不能小于4个字' })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @MaxLength(32, { message: '密码长度不能超过32个字' })
  @MinLength(6, { message: '密码长度不能小于6个字' })
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @MaxLength(32, { message: '确认密码长度不能超过32个字' })
  @MinLength(6, { message: '确认密码长度不能小于6个字' })
  @IsString({ message: '确认密码必须是字符串' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  cpassword: string

  @ValidateNested()
  @Type(() => Code)
  @IsNotEmpty({ message: 'code 必传' })
  code: Code

  @IsEnum(SourceEnum)
  @IsNotEmpty({ message: 'source 必传' })
  source: string
}
