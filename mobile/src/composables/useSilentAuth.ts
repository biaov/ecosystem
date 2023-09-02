import { silentAuthApi } from '@/api/common'
import { useStore } from '@/stores'
import type { UseSilentAuthParam } from './types'

/**
 * 静默授权完成后执行
 */
export const useSilentAuth = async (callback = () => {}, { force = false }: Partial<UseSilentAuthParam> = {}) => {
  const store = useStore()
  if (!store.token || force) {
    const data = await silentAuthApi.get<{ token: string }>()
    store.setToken(data.token)
  }
  callback()
}
