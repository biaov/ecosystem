/**
 * 商品验证器
 */
export class GoodsDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  sku?: string

  @IsOptional()
  @IsNumber()
  categoryId?: number

  @IsOptional()
  @IsBoolean()
  onsale?: boolean
}

/**
 * 商品分类验证器
 */
export class GoodsCategoryDto {
  @IsBoolean()
  all: boolean
}

/**
 * 商品分类验证器-创建
 */
export class GoodsCategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  @IsNotEmpty()
  parentId: number

  @IsInt()
  @IsNotEmpty()
  sort: number
}

/**
 * 商品分类验证器-更新
 */
export class GoodsCategoryUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsInt()
  parentId?: number

  @IsOptional()
  @IsInt()
  sort?: number
}
