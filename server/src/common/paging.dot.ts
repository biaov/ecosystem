/**
 * 分页器
 */
export abstract class PagingDot {
  @IsNumber({}, { message: '必须是数字' })
  current?: number

  @IsNumber({}, { message: '必须是数字' })
  pageSize?: number
}
