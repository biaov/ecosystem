/**
 * 加入购物车验证器
 */
export class CreateCartDto {
  @IsInt()
  goodsId: number

  @IsString()
  @IsNotEmpty()
  sku: string

  @IsInt()
  @IsPositive()
  quantity: number
}

/**
 * 修改购物车验证器
 */
export class UpdateCartDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number

  @IsOptional()
  @IsBoolean()
  checked?: boolean
}

/**
 * 全选 / 取消全选验证器
 */
export class SelectAllCartDto {
  @IsBoolean()
  checked: boolean
}
