<template>
  <!-- 发货弹窗 -->
  <a-modal v-model:open="visible" :title="form?.status === saleOrderStatusEnum.normal ? '申请审核' : '退款审核'" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="订单编号" required>
        <a-input :value="form?.order.sn" disabled />
      </a-form-item>
      <a-form-item label="服务编号" required>
        <a-input :value="form?.sn" disabled />
      </a-form-item>
      <a-form-item label="审核状态" required>
        <a-select v-model:value="formState.type" :options="saleOrderExamineStatusEnum.options()" placeholder="请选择审核状态" />
      </a-form-item>
      <a-form-item label="拒绝原因" required v-if="formState.type === saleOrderExamineStatusEnum.reject">
        <a-textarea v-model:value="formState.result" placeholder="请输入拒绝原因" v-bind="$config.textarea" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { saleOrderExamineApi, saleOrderRefundApi } from '@/api/order'
import { saleOrderStatusEnum, saleOrderExamineStatusEnum } from '../enums'

interface Props {
  form?: {
    id: number
    sn: string
    status: string
    order: {
      sn: string
    }
  }
}
const emit = defineEmits<OkEmit>()
const props = defineProps<Props>()

const visible = defineModel('visible', {
  type: Boolean,
  default: false
})

const { formState, setFormRules, validFormState, resetFormState } = useFormState({
  type: undefined,
  result: undefined
})

setFormRules({
  type: { required: true, message: '请选择审核状态' },
  result: {
    validator: (value: string) => {
      if (formState.value.type === saleOrderExamineStatusEnum.reject && !value) return Promise.reject('请输入拒绝原因')
      return Promise.resolve(true)
    }
  }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await (props.form!.status === saleOrderStatusEnum.normal ? saleOrderExamineApi(props.form!.id).post(formState.value) : saleOrderRefundApi(props.form!.id).post(formState.value))
  visible.value = false
  message.success('操作成功')
  emit('ok')
}
watch(visible, value => {
  value && resetFormState()
})
</script>
