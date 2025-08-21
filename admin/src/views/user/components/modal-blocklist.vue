<template>
  <!-- 拉黑名单弹窗 -->
  <a-modal title="拉黑名单" v-model:open="visible" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="用户昵称">{{ formState.nickname }}</a-form-item>
      <a-form-item label="手机号码">{{ formState.mobile }}</a-form-item>
      <a-form-item label="拉黑原因" required>
        <reason-select v-model="formState.reason" placeholder="请选择拉黑原因" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { userBlocklistApi } from '@/api/user'
import ReasonSelect from './reason-select.vue'

interface FormStateType {
  id: number
  reason?: string
  [k: string]: unknown
}

const emit = defineEmits<{
  (event: 'ok'): void
}>()
const visible = defineModel<boolean>('visible', {
  default: false
})

const modelValue = defineModel<FormStateType | null>()
const { formState, setFormRules, validFormState, setFormState } = useFormState<FormStateType>({
  id: 0,
  reason: undefined
})

setFormRules({
  reason: { required: true, message: '请选择拉黑原因' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const { id, reason } = formState.value
  await userBlocklistApi.create({ id, reason })
  message.success('操作成功')
  visible.value = false
  emit('ok')
}

watch(visible, value => {
  if (!value) return
  modelValue.value && setFormState({ ...modelValue.value, reason: undefined })
})
</script>
