class CaptchaDot {
  @IsString({ message: 'id 必须是字符串' })
  @IsNotEmpty({ message: 'id 必传' })
  id: string

  @IsNumber({}, { each: true, message: '数组中的每个元素必须是数字' })
  @ArrayNotEmpty({ message: 'value 不能为空' })
  @IsArray({ message: 'value 必须是数组' })
  @IsNotEmpty({ message: 'value 必传' })
  value: number[]
}

/**
 * 验证码校验
 */
export class VerifyCaptchaDot extends CaptchaDot {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  username: string
}

/**
 * 验证码校验（手机号）
 */
export class VerifyCaptchaByMobileDot extends CaptchaDot {
  @IsPhoneNumber('CN')
  @IsNotEmpty()
  @IsString()
  username: string
}
