/**
 * 分页器
 */
abstract class PagingDot {
  @IsOptional()
  @IsString()
  current: string

  @IsOptional()
  @IsString()
  pageSize: string
}
export { PagingDot }
