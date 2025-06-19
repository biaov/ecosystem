<template>
  <!-- 详情页基础组件 -->
  <div class="layout-form">
    <a-form :label-col="layoutLabelCol" :wrapper-col="layoutWrapperCol">
      <a-space direction="vertical" :size="20">
        <slot></slot>
      </a-space>
    </a-form>
    <div class="submit-bar">
      <a-space :size="10">
        <a-button v-if="cancelText" @click="onCancel">{{ cancelText }}</a-button>
        <a-button v-if="submitText" type="primary" :loading="loading" @click="onSave">{{ submitText }}</a-button>
        <slot name="button"></slot>
      </a-space>
    </div>
    <div class="submit-bar-place"></div>
  </div>
</template>
<script lang="ts" setup>
import { useLoading } from '@/composables/useToggles'

const router = useRouter()
const emit = defineEmits(['cancel', 'submit'])
const { loading, setLoading } = useLoading()

defineProps({
  submitText: {
    // 保存按钮显示
    type: String,
    default: '保存'
  },
  cancelText: {
    // 取消按钮显示
    type: String,
    default: '取消'
  }
})
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
      await emit('submit')
    } finally {
      setLoading(false)
    }
  }, 0)
}
</script>
<style scoped lang="less">
.layout-form {
  position: relative;

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
  }

  .submit-bar {
    &,
    &-place {
      height: 60px;
    }

    position: fixed;
    bottom: 6px;
    left: 0;
    z-index: 9;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    background: #fff;
    box-shadow: 0 0px 8px #f0f1f2;

    :deep(.ant-space) {
      padding-right: 10px;
      justify-content: flex-end;
    }
  }
}
</style>
