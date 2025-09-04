import type { UserInfo } from './types'

const state = reactive<{
  token: string | null
  userInfo: UserInfo | null
}>({
  token: null,
  userInfo: null
})

export const useStore = () => {
  const router = useRouter()
  const tokenStorage = useCookie<string | null>('token', { default: () => null })
  const userInfoStorage = useCookie<UserInfo | null>('userInfo', { default: () => null })
  state.token = tokenStorage.value
  state.userInfo = userInfoStorage.value
  /**
   * 登录
   */
  const login = (userInfo: UserInfo) => {
    state.token = userInfo.token
    state.userInfo = userInfo
    setStorage()
  }
  /**
   * 登出
   */
  const logout = () => {
    state.token = state.userInfo = null
    setStorage()
    router.push('/login')
  }

  const setStorage = () => {
    tokenStorage.value = state.token
    userInfoStorage.value = state.userInfo
  }

  const isLogin = computed(() => !!state.token)

  return { state: readonly(state), login, logout, isLogin }
}

