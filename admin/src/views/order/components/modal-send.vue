<template>
  <!-- 发货弹窗 -->
  <a-modal v-model:open="visible" title="发货" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="订单编号" required>
        <a-input :value="form?.sn" disabled />
      </a-form-item>
      <a-form-item label="快递公司" required>
        <a-select v-model:value="formState.expressCode" :options="data" placeholder="请选择快递公司" />
      </a-form-item>
      <a-form-item label="快递单号" required>
        <a-input v-model:value="formState.expressSn" placeholder="请输入快递单号" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { orderShippedApi, creditOrderShippedApi } from '@/api/order'
import { expressSettingApi } from '@/api/setting'

interface Props {
  form?: {
    id: number
    sn: string
  }
  type?: string
}
const emit = defineEmits<OkEmit>()
const props = withDefaults(defineProps<Props>(), {
  type: 'order'
})

const visible = defineModel('visible', {
  type: Boolean,
  default: false
})

const { data } = useApiRequest(async () => {
  const res = await expressSettingApi.get()
  if (!res) return []
  return res.value
})

const { formState, setFormRules, validFormState } = useFormState({
  expressCode: undefined,
  expressSn: undefined
})

setFormRules({
  expressCode: { required: true, message: '请输入快递公司' },
  expressSn: { required: true, message: '请输入快递单号' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await (props.type === 'order' ? orderShippedApi(props.form!.id).post(formState.value) : creditOrderShippedApi(props.form!.id).post(formState.value))
  visible.value = false
  message.success('操作成功')
  emit('ok')
}
</script>
