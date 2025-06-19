<template>
  <div class="w-screen h-screen bg-radial flex justify-center items-center relative">
    <div class="absolute top-50 left-50 cursor-pointer">
      <a-image src="/logo-white.svg" :width="60" :preview="false" />
    </div>
    <a-card class="w-320">
      <a-form>
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane :key="0">
            <template #tab>
              <span>
                <u-ant-icon name="UserSwitchOutlined" />
                账号登录
              </span>
            </template>
            <a-form-item>
              <a-input v-model:value="formState.username" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item>
              <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane :key="1">
            <template #tab>
              <span>
                <u-ant-icon name="MobileOutlined" />
                手机号登录
              </span>
            </template>
            <a-form-item>
              <a-input v-model:value="formState.username" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item>
              <c-sms :mobile="formState.username" v-model="formState.code" ref="sms" />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <router-link to="/register" class="text-center text-info block">还没有账号？去注册</router-link>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { loginApi, mobileLoginApi } from '@/api/auth'

const router = useRouter()
const store = useStore()
const smsRef = useTemplateRef<{ valid: () => string }>('sms')
const activeKey = ref(0)
const { formState, setFormRules, validFormState } = useFormState({
  username: '15575148487',
  password: '123456',
  code: null
})

setFormRules({
  username: {
    required: true,
    message: '请输入账号',
    validator(value: string) {
      if (activeKey.value && !useValidPhone(value)) return Promise.reject('手机号格式错误')
      return Promise.resolve()
    }
  },
  password: {
    validator(value: string) {
      if (!activeKey.value && !value) return Promise.reject('请输入密码')
      return Promise.resolve()
    }
  },
  code: {
    validator() {
      if (activeKey.value) {
        const result = smsRef.value!.valid()
        if (result) return Promise.reject(result)
      }
      return Promise.resolve()
    }
  }
})

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!(await validFormState())) return
  const userInfo = await (activeKey.value ? mobileLoginApi.post<UserInfo>(formState.value) : loginApi.post<UserInfo>(formState.value))
  message.success('登录成功')
  store.login(userInfo)
  router.push({ name: 'dashboard' })
}
</script>
