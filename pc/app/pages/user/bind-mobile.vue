<template>
  <!-- 绑定/更换手机号 -->
  <div class="flex flex-col gap-24 w-400 mx-auto">
    <h2 class="text-center text-2xl text-gray-900">更换邮箱</h2>
    <div>
      <div class="mb-12">昵称</div>
      <me-input v-model="formState.mobile" placeholder="请输入您的手机号" maxlength="11" />
    </div>
    <div>
      <div class="mb-12">验证码</div>
      <c-sms :username="formState.mobile" v-model="formState.code" placeholder="随便输入" />
    </div>
    <me-button type="primary" class="cursor-pointer hover:bg-primary transition rounded-[0]! w-full" @click="handleSubmit">提交</me-button>
  </div>
</template>
<script lang="ts" setup>
import { bindMobileApi } from '@/api/user'

const router = useRouter()
const { updateUserInfo, state } = useStore()
const { formState, setFormRules, validFormState } = useFormState({
  mobile: '',
  code: ''
})
setFormRules({
  mobile: {
    required: true,
    message: '请输入手机号'
  },
  code: {
    required: true,
    message: '请输入验证码'
  }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  useToastRequest(
    () => bindMobileApi.post<UserInfo>(formState.value),
    res => {
      updateUserInfo(res)
      router.replace('/user')
    }
  )
}
</script>
