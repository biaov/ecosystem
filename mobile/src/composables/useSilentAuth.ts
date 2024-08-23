import { silentAuthApi } from '@/api/common'
import { useStore } from '@/stores'
import type { UseSilentAuthParam } from './types'

let silentAuthPromise: Promise<void> | null = null

/**
 * 静默授权完成后执行
 */
export const useSilentAuth = async (callback = () => {}, { force = false }: Partial<UseSilentAuthParam> = {}) => {
  if (silentAuthPromise) {
    await silentAuthPromise
    silentAuthPromise = null
    callback()
    return
  }

  const store = useStore()
  if (!store.state.token || force) {
    store.clearToken()
    silentAuthPromise = new Promise((resolve, reject) => {
      silentAuthApi
        .get<{ token: string }>()
        .then(data => {
          store.setToken(data.token)
          resolve()
        })
        .catch(reject)
    })
    await silentAuthPromise
  }
  callback()
}
