<template>
  <!-- 登录页 -->
  <div class="flex flex-col items-center pt-120">
    <h1 class="text-6xl font-bold text-center mb-60">注册</h1>
    <div class="form w-500 bg-white p-48 flex flex-col gap-24">
      <me-input v-model="formState.username" placeholder="请输入邮箱" maxlength="32" />
      <c-sms :username="formState.username" v-model="formState.code" />
      <me-input password v-model="formState.password" placeholder="请输入密码" maxlength="32" />
      <me-input password v-model="formState.cpassword" placeholder="请输入确认密码" maxlength="32" />
      <me-button type="primary" @click="handleSubmit" block class="cursor-pointer hover:bg-primary transition rounded-[0]!">注册</me-button>
      <NuxtLink to="/login" class="text-center text-info block hover:text-primary">已有账号，去登录</NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { registerApi } from '@/api/auth'

const router = useRouter()
const { formState, setFormRules, validFormState } = useFormState({
  username: '',
  code: '',
  password: '',
  cpassword: ''
})

setFormRules({
  username: useValidEmailForm(true),
  code: { required: true, message: '请输入验证码' },
  password: { required: true, message: '请输入密码' },
  cpassword: {
    validator(value: string) {
      if (value !== formState.value.password) return Promise.reject('确认密码和密码不一致')
      return Promise.resolve()
    }
  }
})

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!(await validFormState())) return
  useToastRequest(
    () => registerApi.post({ ...formState.value, source: sourceEnum.admin }),
    () => {
      router.push('/login')
    },
    '注册成功，请登录'
  )
}
</script>
