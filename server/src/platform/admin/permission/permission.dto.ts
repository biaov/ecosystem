/**
 * 角色验证器
 */
export class RoleDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString({ each: true })
  createdAt?: string[]
}

/**
 * 菜单验证器
 */
export class MenuDto extends PagingDot {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString({ each: true })
  createdAt?: string[]
}

/**
 * 菜单验证器-创建
 */
export class MenuCreateDto {
  @IsString()
  name: string

  @IsString()
  content: string

  @IsString()
  type: string

  @IsNumber()
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
