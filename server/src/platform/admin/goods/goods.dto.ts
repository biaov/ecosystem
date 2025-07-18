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

  @IsOptional()
  @IsBoolean()
  onsale?: boolean
}

class Attr {
  @IsString()
  @IsNotEmpty()
  label: string

  @IsString()
  @IsNotEmpty()
  value: string
}

class Specs {
  @ValidateNested()
  @Type(() => Attr)
  attrs: Attr[]

  @IsString()
  @IsNotEmpty()
  photo: string

  @IsString()
  @IsNotEmpty()
  sku: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsInt()
  id?: number
}

/**
 * 商品验证器-创建
 */
export class GoodsCreateDto {
  @IsInt()
  categoryId: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsBoolean()
  onsale: boolean

  @IsString()
  @IsNotEmpty()
  defaultSku: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  photos: string[]

  @ValidateNested()
  @Type(() => Specs)
  specs: Specs[]

  @IsString()
  @IsNotEmpty()
  desc: string
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
