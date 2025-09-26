<template>
  <!-- 绑定/更换手机号 -->
  <div class="flex flex-col gap-24 w-400 mx-auto">
    <h2 class="text-center text-2xl text-gray-900">{{ title }}</h2>
    <div>
      <div class="mb-12">昵称</div>
      <me-input v-model="formState.email" placeholder="请输入您的邮箱" maxlength="32" />
    </div>
    <div>
      <div class="mb-12">验证码</div>
      <c-sms :username="formState.email" v-model="formState.code" placeholder="随便输入" />
    </div>
    <me-button type="primary" class="cursor-pointer hover:bg-primary transition rounded-[0]! w-full" @click="handleSubmit">确定</me-button>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title: string
}>()
const emit = defineEmits(['ok'])
const { formState, setFormRules, validFormState } = useFormState({
  email: '',
  code: ''
})
setFormRules({
  email: useValidEmailForm(true),
  code: { required: true, message: '请输入验证码' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  emit('ok', formState.value)
}
</script>
