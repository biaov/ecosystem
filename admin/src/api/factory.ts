import { service } from '@/utils/request'
import { defaultPageSize } from '@/config'
import { PagingResponse } from './types'

export const restful = (path: string) => ({
  paging: <T>(query = {}): Promise<PagingResponse<T>> => service.get(path, { params: { current: 1, pageSize: defaultPageSize, ...query } }),
  all: <T>(query = {}) => service.get(path, { params: { ...query, all: true } }) as Promise<T>,
  get: <T>(id: number): Promise<T> => service.get(`${path}/${id}`),
  create: (data = {}) => service.post(path, data),
  delete: (id: number) => service.delete(`${path}/${id}`),
  update: (id: number, data = {}) => service.put(`${path}/${id}`, data)
})

export const command = (path: string) => ({
  get: <T>(query = {}) => service.get(path, { params: query }) as Promise<T>,
  post: <T>(data = {}, config = {}) => service.post(path, data, config) as Promise<T>
})
