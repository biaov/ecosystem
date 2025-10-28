<template>
  <!-- 绑定/更换邮箱 -->
  <div class="flex flex-col gap-24 w-400 mx-auto">
    <EmailForm title="验证邮箱" @ok="handleEmailValid" v-if="!allowUpdate" />
    <EmailForm title="更换邮箱" @ok="handleSubmit" v-else />
  </div>
</template>
<script lang="ts" setup>
import EmailForm from '@/biz-components/email-form.vue'
import { emailVerifyApi, updateEmailApi } from '@/api/user'

interface FormState {
  mobile: string
  code: string
}

const router = useRouter()
const { updateUserInfo } = useStore()
const allowUpdate = ref(false)
const handleEmailValid = (form: FormState) => {
  useToastRequest(
    () => emailVerifyApi.post(form),
    () => {
      allowUpdate.value = true
    },
    '邮箱验证成功'
  )
}
const handleSubmit = async (form: FormState) => {
  useToastRequest(
    () => updateEmailApi.post<UserInfo>(form),
    res => {
      updateUserInfo(res)
      router.replace('/user')
    }
  )
}
</script>
