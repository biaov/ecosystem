<template>
  <!-- 短信验证输入 -->
  <a-input v-model:value="sms" placeholder="请输入验证码">
    <template #addonAfter>
      <div @click="onSms" class="cursor-pointer" :class="{ disabled: countTime }">
        {{ countTime ? `${countTime}s后重试` : '获取验证码' }}
      </div>
    </template>
  </a-input>
  <c-captcha :username="username" v-model:visible="showCaptcha" @success="onSuccess" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  username?: string
}>()
const [showCaptcha, setShowCaptcha] = useState()
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
  if (!useValidEmail(props.username)) {
    message.error('邮箱格式错误')
    return
  }
  setShowCaptcha(true)
}
</script>

<style lang="less" scoped>
.disabled {
  color: #999;
  cursor: not-allowed;
}
</style>
