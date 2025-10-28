<template>
  <!-- 用户信息  -->
  <div class="flex flex-col gap-24 w-400 mx-auto">
    <h3 class="text-xl font-bold mb-20">修改密码</h3>
    <div class="flex items-center">
      <div class="w-100 shrink-0 before:content-['*'] before:text-red-500 before:mr-4">旧密码</div>
      <me-input v-model="formState.oPassword" placeholder="请输入您的旧密码" type="password" maxlength="32" />
    </div>
    <div class="flex items-center">
      <div class="w-100 shrink-0 before:content-['*'] before:text-red-500 before:mr-4">新密码</div>
      <me-input v-model="formState.password" placeholder="请输入您的新密码" type="password" maxlength="32" />
    </div>
    <div class="flex items-center">
      <div class="w-100 shrink-0 before:content-['*'] before:text-red-500 before:mr-4">确认密码</div>
      <me-input v-model="formState.cPassword" placeholder="请确认您的确认密码" type="password" maxlength="32" />
    </div>
    <me-button type="primary" class="cursor-pointer hover:bg-primary transition rounded-[0]! w-full mt-20" @click="handleSubmit">提交</me-button>
  </div>
</template>

<script lang="ts" setup>
import { updatePasswordApi } from '@/api/user'

const router = useRouter()

const { formState, setFormRules, validFormState } = useFormState({
  oPassword: undefined,
  password: undefined,
  cPassword: undefined
})
setFormRules({
  oPassword: { required: true, message: '请输入您的旧密码' },
  password: { required: true, message: '请输入您的新密码' },
  cPassword: {
    validator: (val: string) => {
      if (val !== formState.value.password) return Promise.reject('两次输入密码不一致')
      return Promise.resolve()
    }
  }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  useToastRequest(
    () => updatePasswordApi.post(formState.value),
    () => {
      router.replace('/user')
    }
  )
}
</script>
