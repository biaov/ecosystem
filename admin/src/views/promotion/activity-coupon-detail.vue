<template>
  <c-layout-form @ok="handleSubmit" v-if="!loading">
    <a-card title="基本信息">
      <a-form-item label="活动时间" required>
        <a-space>
          <a-date-picker v-model:value="formState.startTime" placeholder="请选择开始时间" show-time :disabled="isStart" value-format="YYYY-MM-DD HH:mm:ss" />
          <span>~</span>
          <a-date-picker v-model:value="formState.endTime" placeholder="请选择结束时间" show-time value-format="YYYY-MM-DD HH:mm:ss" />
        </a-space>
      </a-form-item>
      <a-form-item label="活动名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入活动名称" :maxlength="32" />
      </a-form-item>
    </a-card>
    <a-card title="活动规则">
      <a-form-item label="活动发券" required>
        <coupon-rule v-model="formState.rules" :disabled="disabled" />
      </a-form-item>
    </a-card>
    <a-card title="页面配置">
      <a-form-item label="颜色配置" required>
        <a-space>
          <a-input v-model:value="formState.setting.theme" placeholder="请输入主题色，如 #000000" class="w-240">
            <template #suffix>
              <c-color-picker v-model="formState.setting.theme" />
            </template>
          </a-input>
          <a-input v-model:value="formState.setting.background" placeholder="请输入背景色，如 #000000" class="w-240">
            <template #suffix>
              <c-color-picker v-model="formState.setting.background" />
            </template>
          </a-input>
        </a-space>
      </a-form-item>
      <a-form-item label="页面配置" required>
        <a-space>
          <c-upload v-model="formState.setting.bgURL" tip="活动背景" />
          <c-upload v-model="formState.setting.textURL" tip="活动文案" />
        </a-space>
      </a-form-item>
    </a-card>
    <a-card>
      <c-rich-text v-model="formState.desc" placeholder="请输入活动详情..." height="400px" />
    </a-card>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { activityCouponApi } from '@/api/coupon'
import CouponRule from './components/coupon-rule.vue'

interface RuleItemType {
  couponId: string
  quantity: number
}

interface SettingType {
  theme: string
  background: string
  bgURL: string
  textURL: string
}

const { id } = useRoute().params

const isStart = ref(false)

const disabled = ref(!!id)
const router = useRouter()
const { formState, setFormRules, setFormState, validFormState } = useFormState({
  startTime: undefined,
  endTime: undefined,
  name: undefined,
  rules: [],
  setting: {
    theme: '',
    background: '',
    bgURL: '',
    textURL: ''
  },
  desc: ''
})

setFormRules({
  startTime: { required: true, message: '请选择开始时间' },
  endTime: {
    required: true,
    message: '请选择结束时间',
    validator(value: string) {
      if (dayjs(value) <= dayjs(formState.value.startTime)) return Promise.reject('结束时间不能早于开始时间')
      return Promise.resolve()
    }
  },
  name: { required: true, message: '请输入活动名称' },
  rules: {
    validator(value: RuleItemType[]) {
      if (!(value && value.length)) return Promise.reject('请填写活动发券信息')
      if (value.some(item => Object.values(item).some(val => !val))) return Promise.reject('请填写活动发券信息')
      return Promise.resolve()
    }
  },
  setting: {
    validator(value: SettingType) {
      if (!value.theme) return Promise.reject('请输入主题色')
      if (!value.background) return Promise.reject('请输入背景色')
      if (!value.bgURL) return Promise.reject('请上传背景图')
      if (!value.textURL) return Promise.reject('请上传文字图')
      return Promise.resolve()
    }
  },
  desc: { required: true, message: '请输入活动详情' }
})

const { loading } = useApiRequest(
  async () => {
    const res = await activityCouponApi.get<typeof formState.value & { status: string }>(+id)
    isStart.value = res.status !== activityStatusEnum.notStart
    setFormState(res)
  },
  !!id,
  null
)

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await (id ? activityCouponApi.update(+id, formState.value) : activityCouponApi.create(formState.value))
  message.success('操作成功')
  router.back()
}
</script>
