<template>
  <!-- 上传图片 -->
  <a-upload
    list-type="picture-card"
    class="custom-upload"
    :file-list="fileList"
    :max-count="multiple ? maxCount : 1"
    :custom-request="handleUpload"
    :before-upload="onBeforeUpload"
    @preview="onPreview"
    @remove="onRemove"
  >
    <div class="text-gray-400" v-if="multiple ? fileList.length < maxCount : fileList.length < 1">
      <c-ant-icon name="LoadingOutlined" v-if="uploading" />
      <c-ant-icon name="PlusOutlined" v-else />
      上传
    </div>
  </a-upload>
  <!-- 图片预览 -->
  <a-modal v-model:visible="previewVisible" title="图片预览" :footer="null">
    <a-image :src="previewURL" width="100%" :preview="false" />
  </a-modal>
</template>
<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue'
import { uploadImageApi } from '@/api/common'

interface FileListItem {
  status?: string
  url?: string
  uid?: string
  name?: string
}
const props = withDefaults(
  defineProps<{
    multiple?: boolean
    maxCount?: number
  }>(),
  {
    multiple: false,
    maxCount: 9
  }
)
const fileList = defineModel<FileListItem[]>('fileList', { default: [] })
const modelValue = defineModel<string>()
const onBeforeUpload = (file: Required<UploadFile>) => {
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    message.error('只能上传 jpg、jpeg、png 格式的图片')
    return false
  }

  if (file.size > 1024 * 1024 * 1) {
    message.error('只能上传 1M 以下的图片')
    return false
  }

  return true
}
const uploading = ref(false)
const handleUpload = async ({ file }: { file: UploadFile }) => {
  uploading.value = true
  try {
    const { url } = await uploadImageApi.post<{ url: string }>({ file }, { headers: { 'Content-Type': 'multipart/form-data' } })
    fileList.value = [...fileList.value, { url }]
    modelValue.value = url
  } finally {
    uploading.value = false
  }
}
modelValue.value && !fileList.value.length && (fileList.value = [{ url: modelValue.value }])
const previewURL = ref('')
const [previewVisible, setPreviewVisible] = useState(false)
const onPreview = ({ url }: FileListItem) => {
  previewURL.value = url as string
  setPreviewVisible(true)
}

const onRemove = () => {}
</script>

<style lang="less">
.custom-upload {
  min-height: 110px;
}
</style>
