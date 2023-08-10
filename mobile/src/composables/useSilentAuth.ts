import { silentAuthApi } from '@/api/common'
import { useStore } from '@/stores'

/**
 * 静默授权完成后执行
 */
export const useSilentAuth = async (fn?: () => void) => {
  const store = useStore()
  if (!store.token) {
    const data = await silentAuthApi.get<{ token: string }>()
    store.setToken(data.token)
  }
  fn && fn()
}
