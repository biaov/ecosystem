/**
 * 礼品验证器
 */
export class GiftDto extends PagingDot {
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

  @IsOptional()
  @IsBoolean()
  onsale?: boolean

  @IsOptional()
  @IsBoolean()
  recommend?: boolean

  @IsOptional()
  @IsBoolean()
  newest?: boolean

  @IsOptional()
  @IsBoolean()
  preferential?: boolean
}

/**
 * 礼品验证器-创建
 */
export class GiftCreateDto {
  @IsInt()
  categoryId: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsBoolean()
  onsale: boolean

  @IsString()
  @IsNotEmpty()
  sku: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  photos: string[]

  @IsInt()
  credit: number

  @IsString()
  @IsNotEmpty()
  desc: string

  @IsInt()
  stock: number

  @IsBoolean()
  recommend: boolean

  @IsBoolean()
  newest: boolean

  @IsBoolean()
  preferential: boolean
}

/**
 * 礼品验证器-更新
 */
export class GiftUpdateDto {
  @IsOptional()
  @IsInt()
  categoryId?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsBoolean()
  onsale?: boolean

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sku?: string

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  photos?: string[]

  @IsOptional()
  @IsInt()
  credit?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  desc?: string

  @IsOptional()
  @IsInt()
  stock?: number

  @IsOptional()
  @IsBoolean()
  recommend?: boolean

  @IsOptional()
  @IsBoolean()
  newest?: boolean

  @IsOptional()
  @IsBoolean()
  preferential?: boolean
}

/**
 * 礼品分类验证器
 */
export class GiftCategoryDto {
  @IsBoolean()
  all: boolean
}

/**
 * 礼品分类验证器-创建
 */
export class GiftCategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  @IsNotEmpty()
  sort: number
}

/**
 * 礼品分类验证器-更新
 */
export class GiftCategoryUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsInt()
  sort?: number
}
