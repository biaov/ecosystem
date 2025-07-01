<template>
  <a-modal v-model:open="visible" :title="`${formState.id ? '编辑' : '新增'}角色`" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="唯一值" required>
        <a-input v-model:value="formState.code" placeholder="请输入唯一值" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { roleApi } from '@/api/permission'

const visible = defineModel('visible', {
  type: Boolean,
  default: false
})
const modelValue = defineModel({
  type: Object
})
const { formState, setFormRules, validFormState, setFormState, resetFormState } = useFormState({
  id: 0,
  name: '',
  code: ''
})

const emit = defineEmits<{
  (e: 'ok', value: typeof formState.value): void
}>()

setFormRules({
  name: { required: true, message: '请输入名称' },
  code: { required: true, message: '请输入唯一值' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const param = { ...formState.value, children: undefined }
  await (param.id ? roleApi.update(param.id, param) : roleApi.create(param))
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
