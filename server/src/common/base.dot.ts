/**
 * 分页器
 */
abstract class PagingDot {
  @IsOptional()
  @IsInt()
  current: number

  @IsOptional()
  @IsInt()
  pageSize: number
}

export { PagingDot }
