/**
 * 登录验证器
 */
export class LoginDto {
  @MaxLength(11, { message: '用户名长度不能超过11个字符' })
  @MinLength(4, { message: '用户名长度不能小于4个字符' })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @MaxLength(64, { message: '密码长度不能超过64个字符' })
  @MinLength(6, { message: '密码长度不能小于6个字符' })
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
