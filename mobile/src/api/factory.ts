import { service } from '@/utils/request'
import { defaultPageSize } from '@/config'
import { PagingResponse } from './types'

export const restful = (path: string) => ({
  paging: <T>(query = {}): Promise<PagingResponse<T>> => service.get<PagingResponse<T>>(path, { data: { current: 1, pageSize: defaultPageSize, ...query } }),
  all: <T>(query = {}) => service.get(path, { data: { ...query, all: true } }) as Promise<T>,
  get: <T>(id: number) => service.get(`${path}/${id}`) as Promise<T>,
  create: (data = {}) => service.post(path, { data }),
  delete: (id: number) => service.delete(`${path}/${id}`),
  update: <T>(id: number, data = {}) => service.put(`${path}/${id}`, { data }) as Promise<T>,
  replace: (id: number, data = {}) => service.put(`${path}/${id}`, { data })
})

export const command = (path: string) => ({
  get: <T>(query = {}) => service.get(path, { data: query }) as Promise<T>,
  post: <T>(data = {}) => service.post(path, { data }) as Promise<T>,
  file: <T>(data = {}) => service.file(path, { data }) as Promise<T>
})
