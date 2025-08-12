<template>
  <c-layout-form :ok-text="id ? '' : '保存'" @ok="handleSubmit" v-if="!loading">
    <a-card title="基本信息">
      <a-form-item label="发放主题" required>
        <a-input v-model:value="formState.title" placeholder="请输入发放主题" :max-length="32" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="发放用户" required>
        <a-textarea v-model:value="formState.range" placeholder="请输入发放用户手机号码，每行一个" :disabled="disabled" v-bind="$config.textarea" />
      </a-form-item>
    </a-card>
    <a-card title="发放优惠券">
      <a-form-item label="手动发券" required>
        <coupon-rule v-model="formState.rules" :disabled="disabled" />
      </a-form-item>
    </a-card>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { distributeCouponApi } from '@/api/coupon'
import CouponRule from './components/coupon-rule.vue'

interface RuleItemType {
  couponId: string
  quantity: number
}

const { id } = useRoute().params

const disabled = ref(!!id)
const router = useRouter()
const { formState, setFormRules, setFormState, validFormState } = useFormState({
  title: undefined,
  range: undefined,
  rules: []
})

setFormRules({
  title: { required: true, message: '请选择优惠券类型' },
  range: { required: true, message: '请输入优惠券名称' },
  rules: {
    validator(value: RuleItemType[]) {
      if (!(value && value.length)) return Promise.reject('请填写手动发券信息')
      if (value.some(item => Object.values(item).some(val => !val))) return Promise.reject('请填写手动发券信息')
      return Promise.resolve()
    }
  }
})

const { loading } = useApiRequest(
  async () => {
    const res = await distributeCouponApi.get(+id)
    res.range = res.range.join('\n')
    setFormState(res as typeof formState.value)
  },
  !!id,
  null
)

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const param = JSON.parse(JSON.stringify(formState.value))
  param.range = param.range.split('\n')
  await distributeCouponApi.create(param)
  message.success('操作成功')
  router.back()
}
</script>
