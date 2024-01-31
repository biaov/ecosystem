import type { Request, Response } from 'express'

/**
 * 路由配置项
 */
export interface RouteItem {
  path: string
  method: 'get' | 'post' | 'put' | 'delete'
  token?: boolean
  permission?: string | string[]
  controller: (req: Request, res: Response) => Promise<unknown>
  title: string
  upload?: boolean
}

export interface AllRoute {
  default: RouteItem[]
}
