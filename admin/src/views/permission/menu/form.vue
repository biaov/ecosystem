<template>
  <a-modal v-model:open="visible" :title="`${formState.id ? '编辑' : '新增'}权限标识`" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="权限类型" required>
        <a-select v-model:value="formState.type" :options="MenuTypeEnum.filterOptions(!formState.parentId)" :disabled="!!formState.id" />
      </a-form-item>
      <a-form-item label="权限名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入权限名称" />
      </a-form-item>
      <a-form-item label="权限内容" required>
        <a-input v-model:value="formState.content" placeholder="请输入权限内容" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { menuApi } from '@/api/permission'
import { MenuTypeEnum } from '../enums'

const visible = defineModel('visible', {
  type: Boolean,
  default: false
})
const modelValue = defineModel({
  type: Object
})
const { formState, setFormRules, validFormState, setFormState, resetFormState } = useFormState({
  id: 0,
  parentId: 0,
  type: MenuTypeEnum.module,
  name: '',
  content: ''
})

const emit = defineEmits<{
  (e: 'ok', value: typeof formState.value): void
}>()

setFormRules({
  type: { required: true, message: '请选择权限类型' },
  name: { required: true, message: '请输入权限名称' },
  content: { required: true, message: '请输入权限内容' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const param = { ...formState.value, children: undefined }
  await (param.id ? menuApi.update(param.id, param) : menuApi.create(param))
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
    modelValue.value && setFormState({ ...formState.value, ...modelValue.value })
  }
})
</script>
