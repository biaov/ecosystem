<template>
  <a-modal v-model:open="visible" :title="`${formState.id ? '编辑' : '新增'}分类`" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入名称" :maxlength="16" />
      </a-form-item>
      <a-form-item label="排序" required>
        <a-input-number v-model:value="formState.sort" placeholder="请输入排序" :min="1" :max="99" :precision="0" class="w-full" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { giftCategoryApi } from '@/api/gift'

interface FormStateType {
  id: number
  name: string
  parentId: number
  sort: number
}

const visible = defineModel<boolean>('visible', { default: false })
const modelValue = defineModel<Partial<FormStateType> | null>()
const { formState, setFormRules, validFormState, setFormState, resetFormState } = useFormState<Partial<FormStateType>>({
  id: 0,
  name: '',
  sort: undefined,
  parentId: 0
})

const emit = defineEmits<{
  (e: 'ok', value: typeof formState.value): void
}>()

setFormRules({
  name: { required: true, message: '请输入昵称' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const param = { ...formState.value, children: undefined }
  await (param.id ? giftCategoryApi.update(param.id, param) : giftCategoryApi.create(param))
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
