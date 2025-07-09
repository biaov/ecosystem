<template>
  <a-modal v-model:open="visible" :title="`${formState.id ? '编辑' : '新增'}角色`" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="账号" required>
        <a-input v-model:value="formState.username" placeholder="请输入账号/手机号, 密码默认为 88888888" />
      </a-form-item>
      <a-form-item label="昵称" required>
        <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item label="角色" required>
        <c-role-select v-model="formState.roleId" placeholder="请选择角色" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { accountApi } from '@/api/permission'

interface FormStateType {
  id: number
  username: string
  nickname: string
  roleId: number
}

const visible = defineModel<boolean>('visible', { default: false })
const modelValue = defineModel<FormStateType | null>()
const { formState, setFormRules, validFormState, setFormState, resetFormState } = useFormState<Partial<FormStateType>>({
  id: 0,
  username: '',
  nickname: '',
  roleId: undefined
})

const emit = defineEmits<{
  (e: 'ok', value: typeof formState.value): void
}>()

setFormRules({
  username: useValidPhoneForm(true),
  nickname: { required: true, message: '请输入昵称' },
  roleId: { required: true, message: '请选择角色' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const param = { ...formState.value, children: undefined }
  await (param.id ? accountApi.update(param.id, param) : accountApi.create(param))
  message.success('操作成功')
  visible.value = false
  emit('ok', formState.value)
}

watch(visible, value => {
  if (!value) return
  if (modelValue.value?.id) {
    setFormState({ ...modelValue.value })
  } else {
    resetFormState()
  }
})
</script>
