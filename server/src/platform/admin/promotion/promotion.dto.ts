/**
 * 优惠券证器
 */
export class CouponDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsBoolean()
  all?: boolean
}

/**
 * 优惠券证器 - 新增
 */
export class CouponCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(CouponTypeEnum)
  type: string

  @IsNumber()
  value: number

  @IsOptional()
  @IsNumber()
  condition?: number

  @IsString()
  @IsNotEmpty()
  startTime: string

  @IsOptional()
  @IsString()
  endTime?: string
}

/**
 * 优惠券证器 - 更新
 */
export class CouponUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsString()
  endTime?: string
}

/**
 * 优惠券证器 - 统计
 */
export class CouponStatisticDto extends PagingDot {
  @IsOptional()
  @IsEnum(UserCouponStatusEnum)
  status?: string

  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  mobile?: string
}

/**
 * 分发优惠券证器
 */
export class DistributeCouponDto extends PagingDot {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mobile?: string
}

class RuleDto {
  @IsInt()
  couponId: number

  @IsInt()
  quantity: number
}

/**
 * 分发优惠券证器 - 新增
 */
export class DistributeCouponCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  range: string[]

  @ValidateNested()
  @Type(() => RuleDto)
  rules: RuleDto[]
}
