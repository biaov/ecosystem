<template>
  <c-layout-form @ok="handleSubmit" v-if="!loading">
    <a-card title="基本信息">
      <a-form-item label="优惠券类型" required>
        <a-select v-model:value="formState.type" placeholder="请选择优惠券类型" :disabled="disabled" :options="couponTypeEnum.options()" />
      </a-form-item>
      <a-form-item label="优惠券名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入优惠券名称" :maxlength="32" />
      </a-form-item>
    </a-card>
    <a-card title="使用规则">
      <a-form-item label="优惠额度" required>
        <a-input-number v-model:value="formState.value" :min="0" :max="9999" :precision="2" placeholder="请输入优惠额度" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="使用条件" required>
        <a-input-number v-model:value="formState.condition" :min="0" :max="9999" :precision="2" placeholder="请输入商品总金额" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="券有效期" required>
        <a-space>
          <a-date-picker v-model:value="formState.startTime" placeholder="请选择开始时间" show-time :disabled="disabled" value-format="YYYY-MM-DD HH:mm:ss" />
          <span>~</span>
          <a-date-picker v-model:value="formState.endTime" placeholder="结束时间，不填则为永久有效" show-time class="w-267" value-format="YYYY-MM-DD HH:mm:ss" />
        </a-space>
      </a-form-item>
    </a-card>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { couponApi } from '@/api/coupon'
import { couponTypeEnum } from './enums'

const { id } = useRoute().params

const disabled = ref(!!id)
const router = useRouter()
const { formState, setFormRules, setFormState, validFormState } = useFormState({
  type: undefined,
  name: undefined,
  value: undefined,
  condition: undefined,
  startTime: undefined,
  endTime: undefined
})

setFormRules({
  type: { required: true, message: '请选择优惠券类型' },
  name: { required: true, message: '请输入优惠券名称' },
  value: {
    required: true,
    message: '请输入优惠额度',
    validator() {
      if (formState.value.type === couponTypeEnum.discount && Number(formState.value.value) >= 10) return Promise.reject('折扣优惠券优惠额度不能>=10')
      return Promise.resolve()
    }
  },
  condition: {
    validator(value?: number) {
      if (!value && value !== 0) return Promise.reject('请输入使用条件')
      return Promise.resolve()
    }
  },
  startTime: { required: true, message: '请选择开始时间' },
  endTime: {
    validator(value?: string) {
      if (value && dayjs(value) < dayjs(formState.value.startTime)) return Promise.reject('结束时间不能早于开始时间')
      return Promise.resolve()
    }
  }
})

const { loading } = useApiRequest(
  async () => {
    const res = await couponApi.get<typeof formState.value>(+id)
    setFormState(res)
  },
  !!id,
  null
)

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await (id ? couponApi.update(+id, formState.value) : couponApi.create(formState.value))
  message.success('操作成功')
  router.back()
}
</script>
