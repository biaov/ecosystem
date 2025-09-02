<template>
  <!-- 登录页 -->
  <div class="flex flex-col items-center pt-120">
    <h1 class="text-7xl font-bold text-gray-950 text-center mb-60" ref="refa">注册</h1>
    <div class="form w-500 bg-white rounded-md p-48 flex flex-col gap-24">
      <me-input v-model="formState.username" placeholder="请输入手机号，随便填一个" />
      <c-sms :mobile="formState.username" v-model="formState.code" ref="sms" />
      <me-input password v-model="formState.password" placeholder="请输入密码" />
      <me-input password v-model="formState.cpassword" placeholder="请输入确认密码" />
      <me-button type="primary" @click="handleSubmit" block class="cursor-pointer hover:bg-blue-500! transition">注册</me-button>
      <NuxtLink to="/login" class="text-center text-info block hover:text-primary">已有账号，去登录</NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NuxtLink } from '#components'
import { registerApi } from '@/api/auth'

const router = useRouter()
const store = useStore()
const smsRef = useTemplateRef<{ valid: () => string }>('sms')
const { formState, setFormRules, validFormState } = useFormState({
  username: '',
  code: null,
  password: '',
  cpassword: ''
})

setFormRules({
  username: useValidPhoneForm(true),
  code: {
    validator() {
      const result = smsRef.value!.valid()
      if (result) return Promise.reject(result)
      return Promise.resolve()
    }
  },
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
