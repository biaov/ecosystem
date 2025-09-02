<template>
  <!-- 短信验证输入 -->
  <me-input v-model="sms" placeholder="请输入验证码" sms-msg="获取验证码" sms-color="#549ff2" @click-sms="onSms" />
  <c-captcha v-model:visible="showCaptcha" v-model="code" @success="onSuccess" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  mobile?: string
}>()
const [showCaptcha, setShowCaptcha] = useToggle()
const sms = ref('')


const code = defineModel<{
  id: string
  value: string
} | undefined | null>()

const countTime = ref(0)
let timer: NodeJS.Timeout
const onStartCountDown = () => {
  countTime.value--
  if (countTime.value <= 0) {
    countTime.value = 0
  } else {
    clearTimeout(timer)
    timer = setTimeout(onStartCountDown, 1000)
  }
}

const tempSMS = ref('')
const onSuccess = () => {
  countTime.value = 60
  onStartCountDown()
  tempSMS.value = Math.random().toString(36).slice(2)
  sms.value = tempSMS.value
}
const onSms = () => {
  if (countTime.value) return
  if (!useValidPhone(props.mobile)) {
    MeToast('手机号格式错误')
    return
  }
  setShowCaptcha(true)
}

const valid = () => {
  if (!sms.value) return '请输入验证码'
  if (sms.value !== tempSMS.value) return '验证码错误'
  return ''
}

defineExpose({ valid })
</script>

<style lang="less" scoped>
.disabled {
  color: #999;
  cursor: not-allowed;
}
</style>
