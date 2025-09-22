<template>
  <div class="w-screen h-screen bg-radial flex justify-center items-center relative">
    <div class="absolute top-50 left-50 cursor-pointer">
      <a-image :src="$formatter.publicURL('/logo-white.svg')" :width="60" :preview="false" />
    </div>
    <a-card class="w-340">
      <a-form>
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane :key="0">
            <template #tab>
              <div class="flex items-center">
                <c-ant-icon name="UserSwitchOutlined" />
                密码登录
              </div>
            </template>
            <a-form-item>
              <a-input v-model:value="formState.username" placeholder="请输入邮箱" :maxlength="32" />
            </a-form-item>
            <a-form-item>
              <a-input-password v-model:value="formState.password" placeholder="请输入密码" :maxlength="32" />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane :key="1">
            <template #tab>
              <div class="flex items-center">
                <c-svg-icon name="email" size="12" color="inherit" class="mr-12" />
                验证码登录
              </div>
            </template>
            <a-form-item>
              <a-input v-model:value="formState.username" placeholder="请输入邮箱" />
            </a-form-item>
            <a-form-item>
              <c-sms :username="formState.username" v-model="formState.code" />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <router-link to="/forget" class="text-right text-info block -mt-10">忘记密码?</router-link>
      <router-link to="/register" class="text-center text-info block">还没有账号？去注册</router-link>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { loginApi } from '@/api/auth'

const router = useRouter()
const store = useStore()
const activeKey = ref(0)
const { formState, setFormRules, validFormState } = useFormState({
  username: import.meta.env.VITE_DEMO_USERNAME,
  password: import.meta.env.VITE_DEMO_PASSWORD,
  code: ''
})

setFormRules({
  username: useValidEmailForm(true),
  password: {
    validator(value: string) {
      if (!activeKey.value && !value) return Promise.reject('请输入密码')
      return Promise.resolve()
    }
  },
  code: {
    validator(value: string) {
      if (activeKey.value && !value) return Promise.reject('请输入验证码')
      return Promise.resolve()
    }
  }
})

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!(await validFormState())) return
  const userInfo = await loginApi.post<UserInfo>({ ...formState.value, type: activeKey.value ? LoginType.email : LoginType.password })
  message.success('登录成功')
  store.login(userInfo)
  router.push({ name: 'dashboard' })
}
</script>
