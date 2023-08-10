import { useStore } from '@/stores'
import { baseURL } from '@/config'
import { useSilentAuth } from '@/composables/useSilentAuth'
import { toast } from './function'

const request = <T extends Record<string, unknown>>(option: UniApp.RequestOptions): Promise<T> => {
  const state = useStore()
  const config = {
    sslVerify: false,
    dataType: 'json',
    timeout: 100000,
    ...option,
    url: baseURL + option.url,
    header: { Authorization: `Bearer ${state.token}` }
  }
  return new Promise((resolve, reject) => {
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
            useSilentAuth()
            toast('授权已过期，请重新进入小程序')
            break
          default:
            reject(res)
            break
        }
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

export const service = {
  get: <T extends Record<string, unknown>>(url: string, option: Partial<UniApp.RequestOptions> = {}): Promise<T> => request({ ...option, url, method: 'GET' }),
  post: <T extends Record<string, unknown>>(url: string, option: Partial<UniApp.RequestOptions> = {}): Promise<T> => request({ ...option, url, method: 'POST' }),
  put: (url: string, option: Partial<UniApp.RequestOptions> = {}) => request({ ...option, url, method: 'PUT' }),
  delete: (url: string, option: Partial<UniApp.RequestOptions> = {}) => request({ ...option, url, method: 'DELETE' })
}
