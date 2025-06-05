/**
 * 验证码校验
 */
export class VerifyCaptchaDot {
  @IsString({ message: 'id 必须是字符串' })
  @IsNotEmpty({ message: 'id 必传' })
  id: string

  @IsNumber({}, { each: true, message: '数组中的每个元素必须是数字' })
  @ArrayNotEmpty({ message: 'value 不能为空' })
  @IsArray({ message: 'value 必需是数组' })
  @IsNotEmpty({ message: 'value 必传' })
  value: number[]
}
