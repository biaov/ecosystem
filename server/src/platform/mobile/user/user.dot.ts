import type { ValidationArguments } from 'class-validator'

/**
 * 迁移日志验证器
 */
export class PermissionLogDto extends PagingDot {}

class CustomValidation {
  validate(value: string, args: ValidationArguments) {
    const object = args.object as any
    return object.type === InvoiceTypeEnum.normal || value
  }

  /* defaultMessage() {
    return ''
  } */
}

/**
 * 发票信息
 */
export class InvoiceDto {
  @IsEnum(InvoiceTypeEnum)
  type: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  no: string

  @IsOptional()
  @Validate(CustomValidation)
  bank?: string

  @IsOptional()
  @Validate(CustomValidation)
  bankAccount?: string

  @IsOptional()
  @Validate(CustomValidation)
  mobile?: string

  @IsOptional()
  @Validate(CustomValidation)
  address?: string
}
