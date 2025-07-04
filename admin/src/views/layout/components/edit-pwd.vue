<template>
  <a-modal v-model:open="visible" title="修改密码" @ok="handleSubmit">
    <a-form>
      <a-form-item label="原始密码" required>
        <a-input-password v-model:value.trim="formState.opassword" placeholder="请输入原始密码" />
      </a-form-item>
      <a-form-item label="新设密码" required>
        <a-input-password v-model:value.trime="formState.password" placeholder="请输入新设密码" />
      </a-form-item>
      <a-form-item label="确认密码" required>
        <a-input-password v-model:value.trime="formState.cpassword" placeholder="请再次输入新设密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { updatePasswordApi } from '@/api/user'

const visible = defineModel<boolean>('visible', { default: false })
const { formState, resetFormState, setFormRules, validFormState } = useFormState({
  opassword: '',
  password: '',
  cpassword: ''
})

setFormRules({
  opassword: { required: true, message: '请输入原始密码' },
  password: { required: true, message: '请输入新设密码' },
  cpassword: { required: true, message: '请再次输入新设密码' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await updatePasswordApi.post(formState.value)
  message.success('修改成功')
  visible.value = false
}

watch(visible, value => {
  if (!value) return
  resetFormState()
})
</script>
