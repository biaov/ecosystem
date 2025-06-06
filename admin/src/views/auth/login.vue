<template>
  <div class="w-screen h-screen bg-radial flex justify-center items-center relative">
    <div class="absolute top-50 left-50">
      <a-image src="/logo.svg" :width="60" :preview="false" />
    </div>
    <a-card title="登录" class="w-320">
      <a-form>
        <a-form-item>
          <a-input v-model:value="formState.username" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <router-link to="/register" class="text-center text-info block">还没有账号？去注册</router-link>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { loginApi } from '@/api/auth'


const router = useRouter()
const store = useStore()

const { formState, setFormStateRules, validFormState } = useFormState({
  username: '',
  password: '',
})

setFormStateRules({
  username: { required: true, message: '请输入账号' },
  password: { required: true, message: '请输入密码' },
})

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!(await validFormState())) return
  const userInfo = await loginApi.post<UserInfo>(formState.value)
  message.success('登录成功')
  store.login(userInfo)
  router.push({ name: 'dashboard' })
}
</script>
