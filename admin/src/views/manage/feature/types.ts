import type { platforms } from './enums'

/**
 * platforms 枚举类型
 */
export type PlatformsEnums<T = typeof platforms> = T[keyof T] extends infer R ? (R extends string ? R : never) : never

/**
 * 数据列表项
 */
export interface DataType {
  id: number
  name: string
  platforms: PlatformsEnums[]
  iconName: string
  pageUrl: string
  createdAt: string
}
