import { useStore } from '@/stores'
import type { UserInfo } from '@/stores/types'
import { loginApi, registerApi } from '@/api/auth'
import { toast } from '@/utils/function'

/**
 * 登录
 */
export const useLogin = () => {
  const store = useStore()
  const { formState, setFormRules, validatorForm } = useForm({ phoneNumber: '18888888888', password: '123456' })
  setFormRules({
    phoneNumber: { required: true, message: '请输入手机号码' },
    password: { required: true, message: '请输入密码' }
  })

  const onRegister = () => {
    uni.navigateTo({ url: '/pages/auth/register' })
  }

  const handleLogin = async () => {
    if (!(await validatorForm())) return
    loginApi
      .post<{ token: string; userInfo: UserInfo }>(formState.value)
      .then(data => {
        store.login(data)
        uni.navigateBack()
      })
      .catch(toast)
  }

  return { formState, handleLogin, onRegister }
}

/**
 * 注册
 */
export const useRegister = () => {
  const { formState, setFormRules, validatorForm } = useForm({ phoneNumber: '18888888888', password: '123456', cPassword: '123456' })
  setFormRules({
    phoneNumber: { required: true, message: '请输入手机号码' },
    password: { required: true, message: '请输入密码' },
    cPassword: { required: true, message: '请输入确认密码' }
  })

  const onLogin = () => {
    uni.navigateBack()
  }

  const handleRegister = async () => {
    if (!(await validatorForm())) return
    registerApi
      .post(formState.value)
      .then(() => {
        toast('注册成功')
        setTimeout(onLogin, 1500)
      })
      .catch(toast)
  }

  return { formState, handleRegister, onLogin }
}
