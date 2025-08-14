<template>
  <!-- 详情页基础组件 -->
  <div class="layout-form relative pb-60">
    <a-form v-bind="$config.cols">
      <a-space direction="vertical" :size="20">
        <slot></slot>
      </a-space>
    </a-form>
    <div class="h-60 fixed bottom-6 left-0 z-9 flex justify-end items-center w-full bg-white shadow">
      <a-space :size="10" class="pr-10 justify-end">
        <a-button v-if="cancelText" @click="onCancel">{{ cancelText }}</a-button>
        <a-button v-if="okText" type="primary" :loading="loading" @click="onSave">{{ okText }}</a-button>
        <slot name="button"></slot>
      </a-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'ok'): void
}>()
const [loading, setLoading] = useState()

withDefaults(
  defineProps<{
    okText?: string
    cancelText?: string
  }>(),
  {
    okText: '保存',
    cancelText: '取消'
  }
)
// 点击取消
const onCancel = () => {
  router.back()
  emit('cancel')
}
// 点击保存
const onSave = async () => {
  setTimeout(async () => {
    setLoading(true)
    try {
      await emit('ok')
    } finally {
      setLoading(false)
    }
  }, 0)
}
</script>
<style scoped lang="less">
.layout-form {
  :deep(.ant-space) {
    width: 100%;
    display: flex;
  }

  :deep(.ant-input-number) {
    width: 100%;
    max-width: 500px;
  }

  :deep(.ant-form .ant-form-item) {
    .ant-select,
    .ant-input,
    .ant-cascader-picker,
    .ant-input-wrapper,
    .ant-picker {
      max-width: 500px !important;
    }
    .ant-input-number-group-wrapper {
      width: 500px;
    }
  }
}
</style>
