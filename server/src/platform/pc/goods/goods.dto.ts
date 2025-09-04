/**
 * 商品验证器
 */
export class GoodsDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sku?: string

  @IsOptional()
  @IsInt()
  categoryId?: number
}

/**
 * 商品分类验证器
 */
export class GoodsCategoryDto {
  @IsBoolean()
  all: boolean
}
