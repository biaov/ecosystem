<template>
  <me-captcha :item="data" v-model:visible="visible" v-model:status-code="statusCode" @check="onCheck"
    @refresh="getData" v-if="data" />
</template>
<script setup lang="ts">
import { MeCaptcha } from 'mine-h5-ui'
import 'mine-h5-ui/styles/MeCaptcha.css'
import { captchaApi, captchaVerifyApi } from '@/api/common'
import { Captcha } from './types';

const emit = defineEmits([])

const props = defineProps({})
const visible = defineModel('visible', {
  type: Boolean,
  default: false
})

const statusCode = ref(-1)



const { data, getData } = useApiRequest<Captcha.DataType>(async () => {
  statusCode.value = -1
  const res = await captchaApi.get()
  return res.data as Captcha.DataType
}, false, null)



const onCheck = async (value: number[]) => {
  try {
    await captchaVerifyApi.post({
      id: data.value.id,
      value
    })
  } catch (error) {
    console.log(error)
  }
}

</script>