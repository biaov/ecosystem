<template>
  <div class="w-screen h-screen bg-radial flex justify-center items-center relative">
    <div class="absolute top-50 left-50 cursor-pointer">
      <a-image src="/logo-white.svg" :width="60" :preview="false" />
    </div>
    <a-card title="注册" class="w-320">
      <a-form>
        <a-form-item>
          <a-input v-model:value="formState.username" placeholder="请输入手机号，随便填一个" />
        </a-form-item>
        <a-form-item>
          <c-sms :mobile="formState.username" v-model="formState.code" ref="sms" />
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="formState.cpassword" placeholder="请输入确认密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block @click="handleSubmit">注册</a-button>
        </a-form-item>
      </a-form>
      <router-link to="/login" class="text-center text-info">已有账号，去登录</router-link>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { registerApi } from '@/api/auth'

const router = useRouter()
const smsRef = useTemplateRef<{ valid: () => string }>('sms')

const { formState, setFormRules, validFormState } = useFormState({
  username: '',
  code: null,
  password: '',
  cpassword: ''
})

setFormRules({
  username: {
    validator(value: string) {
      if (!useValidPhone(value)) return Promise.reject('手机号格式错误')
      return Promise.resolve()
    }
  },
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
  await registerApi.post({ ...formState.value, source: sourceEnum.admin })
  message.success('注册成功，请登录')
  router.push({ name: 'login' })
}
</script>
