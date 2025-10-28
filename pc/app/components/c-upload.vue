<template>
  <!-- 上传图片 -->
  <view class="relative">
    <slot></slot>
    <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" :title="title" :disabled="disabled" @change="handleChange" />
  </view>
</template>
<script lang="ts" setup>
import { uploadImageApi } from '@/api/common'

const props = withDefaults(
  defineProps<{
    title?: string
    multiple?: boolean
    disabled?: boolean
  }>(),
  {
    multiple: false,
    disabled: false
  }
)
const modelValue = defineModel<string | string[]>()
const onBeforeUpload = (file: File) => {
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    MeToast('只能上传 jpg、jpeg、png 格式的图片')
    return false
  }

  if (file.size > useConfigFile.limit) {
    MeToast('只能上传 1M 以下的图片')
    return false
  }

  return true
}
const handleUpload = async (file: File) => {
  const form = new FormData()
  form.append('file', file)
  useLoadingRequest(async () => {
    const { url } = await uploadImageApi.post<{ url: string }>(form)
    if (props.multiple) {
      ;(modelValue.value as string[]).push(url)
    } else {
      modelValue.value = url
    }
  })
}

const handleChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files![0]!
  if (!onBeforeUpload(file)) return
  handleUpload(file)
}
</script>
