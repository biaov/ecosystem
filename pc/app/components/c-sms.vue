<template>
  <!-- 短信验证输入 -->
  <me-input
    v-model="sms"
    placeholder="请输入验证码"
    :sms-msg="countTime > 0 ? `${countTime}秒后重试` : '获取验证码'"
    :sms-is="countTime > 0"
    sms-color="#549ff2"
    maxlength="20"
    class="cursor-pointer"
    @click-sms="onSms"
  />
  <c-captcha v-model:visible="showCaptcha" @success="onSuccess" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  mobile?: string
}>()
const [showCaptcha, setShowCaptcha] = useToggle()
const sms = defineModel<string>({ default: '' })
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

const onSuccess = () => {
  countTime.value = 60
  onStartCountDown()
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
  return ''
}

defineExpose({ valid })
</script>
