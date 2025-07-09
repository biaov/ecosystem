/**
 * 设置-更新
 */
export class UpdateSettingDto {
  @IsNotEmpty()
  @IsObject()
  value: Record<string, any>
}
