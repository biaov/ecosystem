<template>
  <me-captcha :item="data" v-model:visible="visible" v-model:status-code="statusCode" @check="onCheck"
    @refresh="getData" v-if="data" />
</template>
<script setup lang="ts">
import { MeCaptcha } from 'mine-h5-ui'
import 'mine-h5-ui/styles/MeCaptcha.css'
import { captchaApi, captchaVerifyApi } from '@/api/common'
import { Captcha } from './types';

const emit = defineEmits(['success'])

const visible = defineModel('visible', {
  type: Boolean,
  default: false
})

const modelValue = defineModel({
  type: Object
})

const statusCode = ref(-1)

const { data, getData } = useApiRequest<Captcha.DataType>(async () => {
  statusCode.value = -1
  const res = await captchaApi.get()
  return res.data as Captcha.DataType
}, false, null)



const onCheck = async (value: number[]) => {
  try {
    const res = await captchaVerifyApi.post<ResponseSuccess<{
      id: string
      value: string
    }>>({
      id: data.value.id,
      value
    })
    statusCode.value = 1
    modelValue.value = res.data
    emit('success')
  } catch (error) {
    statusCode.value = (error as ResponseError)?.data?.message?.includes('过期') ? 3 : 2
  }
}

watch(visible, (value) => {
  value && getData()
}, { immediate: true })
</script>