import { useForm } from '@/composables/useForm'
import { useStore } from '@/stores'
import { loginApi } from '@/api/auth'
import { toast } from '@/utils/function'

/**
 * 操作
 */
export const useHandle = () => {
  const store = useStore()
  const { formState, setFormRule, validatorForm } = useForm({ phoneNumber: '18888888888', password: '123456' })
  setFormRule({
    phoneNumber: { required: true, message: '请输入手机号码' },
    password: { required: true, message: '请输入密码' }
  })

  const handleLogin = async () => {
    if (!(await validatorForm())) return
    loginApi
      .post<{ token: string; userInfo: Record<string, unknown> }>(formState.value)
      .then(data => {
        store.login(data)
        uni.navigateBack()
      })
      .catch(error => {
        toast(error.data.message)
      })
  }

  return { formState, handleLogin }
}
