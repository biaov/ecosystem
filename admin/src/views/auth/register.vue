<template>
  <div class="w-screen h-screen bg-radial flex justify-center items-center relative">
    <div class="absolute top-50 left-50">
      <a-image src="/logo.svg" :width="60" :preview="false" />
    </div>
    <a-card title="注册" class="w-320">
      <a-form>
        <a-form-item>
          <a-input v-model:value="formState.username" placeholder="请输入4-16位数字、字母或特殊字符的账号" />
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
  <c-captcha v-model:visible="showCaptcha" v-model="formState.code" @success="handleSubmit" />
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { registerApi } from '@/api/auth'

const router = useRouter()
const showCaptcha = ref(false)

const { formState, setFormStateRules, validFormState } = useFormState({
  username: '',
  password: '',
  cpassword: '',
  code: null
})

setFormStateRules({
  username: {
    validator(value: string) {
      if (!/^[a-zA-Z0-9_-]{4,16}$/.test(value)) return Promise.reject('账号格式错误')
      return Promise.resolve()
    }
  },
  password: { required: true, message: '请输入密码', },
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
  if (!formState.value.code) {
    showCaptcha.value = true
    return
  }
  try {
    await registerApi.post({ ...formState.value, source: sourceEnum.admin })
    message.success('注册成功，请登录')
    router.push({ name: 'login' })
  } catch {
    formState.value.code = null
  }
}
</script>
