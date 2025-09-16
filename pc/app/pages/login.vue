<template>
  <!-- 登录页 -->
  <div class="flex flex-col items-center pt-120">
    <h1 class="text-6xl font-bold text-center mb-60">登录</h1>
    <div class="form w-500 bg-white p-48 flex flex-col gap-24">
      <me-tab v-model="activeKey" class="cursor-pointer" line-color="#409eff">
        <me-tab-item v-for="(item, index) in tabList" :key="index" :label="item" :name="index" />
      </me-tab>
      <me-input v-model="formState.username" placeholder="请输入账号" maxlength="11" />
      <me-input password v-model="formState.password" placeholder="请输入密码" maxlength="16" v-if="!activeKey" />
      <c-sms :mobile="formState.username" v-model="formState.code" ref="sms" v-else />
      <me-button type="primary" @click="handleSubmit" block class="cursor-pointer hover:bg-primary transition rounded-[0]!">登录</me-button>
      <NuxtLink to="/forget-password" class="text-right text-info block hover:text-primary h-24" :class="{ 'pointer-events-none': activeKey }">{{ !activeKey ? '忘记密码?' : '' }}</NuxtLink>
      <NuxtLink to="/register" class="text-center text-info block hover:text-primary">还没有账号？去注册</NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { loginApi } from '@/api/auth'

const tabList = Object.freeze(['密码登录', '验证码登录'])
const router = useRouter()
const store = useStore()
const smsRef = useTemplateRef<{ valid: () => string }>('sms')
const activeKey = ref(0)
const { formState, setFormRules, validFormState } = useFormState({
  username: '18888888888',
  password: '123456',
  code: null
})

setFormRules({
  username: useValidPhoneForm(true),
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
  useToastRequest(
    () => loginApi.post<UserInfo>({ ...formState.value, type: activeKey.value ? 'mobile' : 'password' }),
    userInfo => {
      store.login(userInfo)
      router.push('/')
    },
    '登录成功'
  )
}
</script>
