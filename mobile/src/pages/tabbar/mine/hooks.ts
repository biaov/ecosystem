import { ref } from 'vue'
import { useStore } from '@/stores'

/**
 * 操作
 */
export const useHandle = () => {
  const store = useStore()

  /**
   * 跳转登录页
   */
  const onNavToLogin = () => {
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }

  /**
   * 退出登录
   */
  const onExit = () => {
    store.logout()
    onNavToLogin()
  }

  return { onNavToLogin, onExit }
}

/**
 * API 测试
 */
export const useApiTest = () => {
  /**
   * 版本信息
   */
  const packageInfo = ref({})

  /**
   * 接口请求
   */
  const handleTest = async () => {}

  return { packageInfo, handleTest }
}
