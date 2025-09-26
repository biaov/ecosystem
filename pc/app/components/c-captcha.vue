<template>
  <!-- 验证器 -->
  <me-captcha :item="data" v-model:visible="visible" v-model:status-code="statusCode" @check="onCheck" @refresh="getData" v-show="data" />
</template>
<script lang="ts" setup>
import { MeCaptcha } from 'mine-h5-ui'
import 'mine-h5-ui/styles/MeCaptcha.css'
import { captchaApi, captchaByMobileApi } from '@/api/common'
import type { Captcha } from './types'

const emit = defineEmits(['success'])
const props = defineProps<{
  username?: string
}>()
const visible = defineModel<boolean>('visible', { default: false })
const statusCode = ref(-1)

const { data, getData, loading } = useApiRequest<Captcha.DataType>(
  () => {
    statusCode.value = -1
    return captchaApi.get()
  },
  false,
  null
)

const onCheck = async (value: number[]) => {
  if (!props.username) return
  try {
    const option = { id: data.value.id, value, username: props.username }
    await (option.username.includes('@') ? captchaApi.post(option) : captchaByMobileApi.post(option))
    statusCode.value = 1
    emit('success')
  } catch (error) {
    statusCode.value = (error as ResponseError)?.data?.message?.includes('过期') ? 3 : 2
  }
}

watch(
  visible,
  value => {
    value && getData()
  },
  { immediate: true }
)
</script>
