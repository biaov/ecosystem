import { ExamineTypeEnum } from './enums'

/**
 * 订单验证器
 */
export class OrderDto extends PagingDot {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sn?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mobile?: string

  @IsOptional()
  @IsString()
  sku?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(SourceEnum)
  source?: string

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status?: string

  @IsOptional()
  @IsEnum(OrderTypeEnum)
  type?: string
}

/**
 * 订单发货验证器
 */
export class UpdateShippedDto {
  @IsString()
  @IsNotEmpty()
  expressCode: string

  @IsString()
  @IsNotEmpty()
  expressSn: string
}

/**
 * 积分订单验证器
 */
export class CreditOrderDto extends PagingDot {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sn?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mobile?: string

  @IsOptional()
  @IsString()
  sku?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(SourceEnum)
  source?: string

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status?: string

  @IsOptional()
  @IsEnum(OrderTypeEnum)
  type?: string
}

/**
 * 售后订单验证器
 */

export class SaleOrderDto extends PagingDot {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  orderSn?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sn?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mobile?: string

  @IsOptional()
  @IsString()
  sku?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(SaleOrderStatusEnum)
  status?: string

  @IsOptional()
  @IsEnum(SaleOrderTypeEnum)
  type?: string
}

/**
 * 售后订单审核验证器
 */
export class UpdateExamineDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  result?: string

  @IsEnum(ExamineTypeEnum)
  type: string
}
