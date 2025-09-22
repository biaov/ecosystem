<template>
  <div class="w-screen h-screen bg-radial flex justify-center items-center relative">
    <div class="absolute top-50 left-50 cursor-pointer">
      <a-image :src="$formatter.publicURL('/logo-white.svg')" :width="60" :preview="false" />
    </div>
    <a-card title="注册" class="w-340">
      <a-form>
        <a-form-item>
          <a-input v-model:value="formState.username" placeholder="请输入您的邮箱" :maxlength="32" />
        </a-form-item>
        <a-form-item>
          <c-sms :username="formState.username" v-model="formState.code" />
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="formState.password" placeholder="请输入密码" :maxlength="32" />
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="formState.cpassword" placeholder="请输入确认密码" :maxlength="32" />
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
  await registerApi.post({ ...formState.value, source: sourceEnum.admin })
  message.success('注册成功，请登录')
  router.push({ name: 'login' })
}
</script>
