import { PermissionType } from './enums'

/**
 * 角色验证器
 */
export class RoleDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string
}

/**
 * 角色验证器-创建
 */
export class RoleCreateDto {
  @IsString()
  name: string

  @IsString()
  code: string
}

/**
 * 角色验证器-更新
 */
export class RoleUpdateDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  code: string
}

/**
 * 角色验证器-分配权限
 */
export class RolePermissionDto {
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  permissions: string[]
}

/**
 * 菜单验证器
 */
export class MenuDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  createdAt?: string

  @IsOptional()
  @IsBoolean()
  all?: boolean
}

/**
 * 菜单验证器-创建
 */
export class MenuCreateDto {
  @IsString()
  name: string

  @IsString()
  content: string

  @IsEnum(PermissionType)
  @IsString()
  type: string

  @IsInt()
  parentId: number
}

/**
 * 菜单验证器-更新
 */
export class MenuUpdateDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  content: string
}
