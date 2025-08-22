import { PermissionType } from './enums'

/**
 * 角色验证器
 */
export class RoleDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsBoolean()
  all?: boolean
}

/**
 * 角色验证器-创建
 */
export class RoleCreateDto {
  @IsString()
  name: string
}

/**
 * 角色验证器-更新
 */
export class RoleUpdateDto {
  @IsOptional()
  @IsString()
  name: string
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
  @IsBoolean()
  all: boolean
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

  @IsEnum(PermissionType)
  @IsString()
  type: string
}

/**
 * 账号验证器
 */
export class AccountDto extends PagingDot {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  mobile?: string

  @IsOptional()
  @IsString()
  roleId?: string
}

/**
 * 账号验证器-创建
 */
export class AccountCreateDto {
  @IsString()
  username: string

  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsInt()
  roleId: number
}

/**
 * 账号验证器-更新
 */
export class AccountUpdateDto {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsInt()
  roleId?: number
}
