import { useStore } from '@/stores'
import { baseURL } from '@/config'
import { toast } from './function'
import type { RequestType } from './types'

const request = <T extends Record<string, unknown>>(option: UniApp.RequestOptions, type: RequestType = 'request'): Promise<T> => {
  const state = useStore()
  const baseConfig = {
    url: baseURL + option.url,
    header: { Authorization: `Bearer ${state.token}` }
  }
  const config = {
    sslVerify: false,
    dataType: 'json',
    timeout: 100000,
    ...option,
    ...baseConfig
  }
  return new Promise((resolve, reject) => {
    if (type === 'request') {
      uni.request({
        ...config,
        success: res => {
          const { statusCode, data } = res
          switch (statusCode) {
            case 304:
            case 200:
              resolve(data as T)
              break
            case 401:
              state.clearToken()
              toast('授权已过期，请重新进入页面')
              break
            default:
              reject(res)
              break
          }
        },
        fail: reject
      })
    } else {
      uni.uploadFile({
        ...baseConfig,
        filePath: (option.data as Record<string, any>).url,
        name: 'file',
        success: res => {
          const { statusCode, data } = res
          switch (statusCode) {
            case 304:
            case 200:
              resolve(JSON.parse(data) as T)
              break
            case 401:
              state.clearToken()
              toast('授权已过期，请重新进入页面')
              break
            default:
              reject(res)
              break
          }
        },
        fail: reject
      })
    }
  })
}

export const service = {
  get: <T extends Record<string, unknown>>(url: string, option: Partial<UniApp.RequestOptions> = {}): Promise<T> => request({ ...option, url, method: 'GET' }),
  post: <T extends Record<string, unknown>>(url: string, option: Partial<UniApp.RequestOptions> = {}): Promise<T> => request({ ...option, url, method: 'POST' }),
  put: (url: string, option: Partial<UniApp.RequestOptions> = {}) => request({ ...option, url, method: 'PUT' }),
  delete: (url: string, option: Partial<UniApp.RequestOptions> = {}) => request({ ...option, url, method: 'DELETE' }),
  file: (url: string, option: Partial<UniApp.RequestOptions> = {}) => request({ ...option, url, method: 'DELETE' }, 'file')
}
