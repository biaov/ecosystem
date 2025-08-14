<template>
  <!-- 上传图片 -->
  <a-upload
    list-type="picture-card"
    class="custom-upload"
    :class="{ single: !multiple }"
    :file-list="fileList"
    :max-count="multiple ? maxCount : 1"
    :custom-request="handleUpload"
    :before-upload="onBeforeUpload"
    :disabled="disabled"
    :show-upload-list="size > maxSize"
    :title="title"
    @preview="onPreview"
    @remove="onRemove"
  >
    <div class="text-gray-400" v-if="multiple ? fileList.length < maxCount : fileList.length < 1">
      <c-ant-icon name="PlusOutlined" />
      <div v-if="size > maxSize">{{ tip }}</div>
    </div>
    <img :src="modelValue" width="100%" height="100%" class="rounded-lg block object-cover" v-else-if="size <= maxSize" />
  </a-upload>
  <!-- 图片预览 -->
  <a-modal v-model:open="previewVisible" title="图片预览" :footer="null">
    <a-image :src="previewURL" width="100%" :preview="false" />
  </a-modal>
</template>
<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue'
import { uploadImageApi } from '@/api/common'

const maxSize = 60
interface FileListItem {
  url: string
  uid?: string
}

const props = withDefaults(
  defineProps<{
    multiple?: boolean
    maxCount?: number
    disabled?: boolean
    size?: number
    title?: string
    tip?: string
  }>(),
  {
    multiple: false,
    maxCount: 9,
    disabled: false,
    size: 102,
    tip: '上传'
  }
)
const gap = computed(() => (props.multiple ? 8 : 0))
const sizepx = computed(() => `${props.size}px`)
const minHeight = computed(() => `${props.size + gap.value}px`)
const margin = computed(() => `${gap.value}px`)
const list = defineModel<string[]>('list', { default: () => [] })
const fileList = ref<FileListItem[]>([])
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
const handleUpload = async ({ file }: { file: UploadFile }) => {
  useLoadingRequest(async () => {
    const { url } = await uploadImageApi.post<{ url: string }>({ file }, { headers: { 'Content-Type': 'multipart/form-data' } })
    fileList.value = [...fileList.value, { url }]
    modelValue.value = url
  })
}
modelValue.value && !fileList.value.length && (fileList.value = [{ url: modelValue.value }])
const previewURL = ref('')
const [previewVisible, setPreviewVisible] = useState(false)
const onPreview = ({ url }: FileListItem) => {
  previewURL.value = url
  setPreviewVisible(true)
}

const onRemove = ({ uid }: UploadFile) => {
  fileList.value = fileList.value.filter(item => item.uid !== uid)
  modelValue.value = ''
}

watch(
  fileList,
  value => {
    list.value = value.map(item => item.url)
  },
  { immediate: true, deep: true }
)
watch(
  list,
  value => {
    const urls = fileList.value.map(item => item.url)
    const newFileList = value.filter(url => !urls.includes(url)).map(url => ({ url }))
    newFileList.length && (fileList.value = newFileList)
  },
  { immediate: true, deep: true }
)
</script>

<style lang="less">
.custom-upload {
  position: relative;
  min-height: v-bind(minHeight);
  &.single {
    width: v-bind(minHeight);
    height: v-bind(minHeight);
    overflow: hidden;
  }
  .ant-upload,
  .ant-upload-list-item-container {
    width: v-bind(sizepx) !important;
    height: v-bind(sizepx) !important;
    margin-inline-end: v-bind(margin) !important;
    margin-bottom: v-bind(margin) !important;
    overflow: hidden;
  }
}
</style>
