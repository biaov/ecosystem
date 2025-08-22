<template>
  <c-layout-form cancel-text="" ok-text="">
    <a-card title="发货设置">
      <a-form-item label="自动取消订单" required>
        <a-input-number v-model:value="formState.cancelTime" placeholder="请输入自动取消订单时间" :min="1" :max="60 * 24" :precision="0" addon-after="分钟" />
      </a-form-item>
      <a-form-item label="自动确认收货" required>
        <a-input-number v-model:value="formState.receiptTime" placeholder="请输入自动确认收货时间" :min="1" :max="60 * 24" :precision="0" addon-after="天" />
      </a-form-item>
    </a-card>
    <a-card title="退货地址">
      <a-form-item label="联系人" required>
        <a-input v-model:value="formState.name" placeholder="请输入联系人" />
      </a-form-item>
      <a-form-item label="联系号码" required>
        <a-input :maxlength="11" v-model:value="formState.mobile" placeholder="请输入联系号码" />
      </a-form-item>
      <a-form-item label="所在城市" required>
        <c-cascader v-model:province="formState.province" v-model:city="formState.city" v-model:district="formState.district" />
      </a-form-item>
      <a-form-item label="详细地址" required>
        <a-input v-model:value="formState.address" placeholder="请输入详细地址" />
      </a-form-item>
    </a-card>
    <a-card title="售后设置">
      <a-form-item label="退款理由" required>
        <a-textarea v-model:value="formState.refundReason" placeholder="请输入退款理由，每行一个" v-bind="$config.textarea" />
      </a-form-item>
      <a-form-item label="退货须知" required>
        <a-textarea v-model:value="formState.returnInstructions" placeholder="请输入退货须知" v-bind="$config.textarea" />
      </a-form-item>
    </a-card>
    <template #button>
      <a-button type="primary" @click="handleSubmit" v-perm="[permKey.create, permKey.update]">保存</a-button>
    </template>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { orderSettingApi } from '@/api/setting'

const permKey = definePermission(PermissionKeyEnum.settingOrder)
const { formState, setFormState, setFormRules, validFormState } = useFormState({
  id: 0,
  cancelTime: undefined as unknown as number,
  receiptTime: undefined as unknown as number,
  name: '',
  mobile: '',
  province: '',
  city: '',
  district: '',
  address: '',
  refundReason: '',
  returnInstructions: ''
})

setFormRules({
  cancelTime: { required: true, message: '请输入自动取消订单时间' },
  receiptTime: { required: true, message: '请输入自动确认收货时间' },
  name: { required: true, message: '请输入联系人' },
  mobile: useValidPhoneForm(true),
  province: { required: true, message: '请选择所在城市' },
  city: { required: true, message: '请选择所在城市' },
  district: { required: true, message: '请选择所在城市' },
  address: { required: true, message: '请输入详细地址' },
  refundReason: { required: true, message: '请输入退款理由' },
  returnInstructions: { required: true, message: '请输入退货须知' }
})

const { getData } = useApiRequest(async () => {
  const res = await orderSettingApi.get<{ id: number; value: Omit<typeof formState.value, 'id'> } | null>()
  if (!res) return
  setFormState({ id: res.id, ...useTransfromTextarea.transfromToForm(res.value, ['refundReason']) })
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const param = { value: useTransfromTextarea.transfromToData(formState.value, ['refundReason']) }
  await (formState.value.id ? orderSettingApi.update(param) : orderSettingApi.post(param))
  message.success('保存成功')
  getData()
}
</script>
