import { service } from '@/utils/request'
import { defaultPageSize } from '@/config'
import { PagingResponse } from './types'

export const restful = (path: string) => ({
  paging: <T>(query = {}): Promise<PagingResponse<T>> => service.get(path, { params: { current: 1, pageSize: defaultPageSize, ...query } }),
  all: (query = {}) => service.get(path, { params: { ...query, all: true } }) as Promise<Record<string, any>[]>,
  get: <T>(id: number): Promise<T> => service.get(`${path}/${id}`),
  create: (data = {}) => service.post(path, data),
  delete: (id: number) => service.delete(`${path}/${id}`),
  update: (id: number, data = {}) => service.patch(`${path}/${id}`, data),
  replace: (id: number, data = {}) => service.put(`${path}/${id}`, data)
})

export const command = (path: string) => ({
  get: (query = {}) => service.get(path, { params: query }) as Promise<Record<string, any>>,
  post: <T extends Record<string, any>>(data = {}, config = {}): Promise<T> => service.post(path, data, config)
})
