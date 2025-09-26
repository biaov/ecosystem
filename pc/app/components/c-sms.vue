<template>
  <!-- 短信验证输入 -->
  <me-input
    v-model="sms"
    :placeholder="placeholder"
    :sms-msg="countTime > 0 ? `${countTime}s后重试` : '获取验证码'"
    :sms-is="countTime > 0"
    sms-color="#549ff2"
    maxlength="6"
    class="cursor-pointer"
    @click-sms="onSms"
  />
  <c-captcha :username="username" v-model:visible="showCaptcha" @success="onSuccess" />
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    username?: string
    placeholder?: string
    type?: 'mobile' | 'email'
  }>(),
  {
    placeholder: '请输入验证码',
    type: 'email'
  }
)
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
  if (props.type === 'email') {
    if (!useValidEmail(props.username)) {
      MeToast('邮箱格式错误')
      return
    }
  } else if (!useValidMobile(props.username)) {
    MeToast('手机号格式错误')
    return
  }

  setShowCaptcha(true)
}
</script>
