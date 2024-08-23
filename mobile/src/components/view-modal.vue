<script setup lang="ts">
import type { ViewModal } from './types'

/**
 * 响应事件
 */
const emit = defineEmits<ViewModal.Emits>()

/**
 * 所需参数
 */
withDefaults(
  defineProps<{
    title?: string
    background?: string
    width?: string
    cancelText?: string
    okText?: string
  }>(),
  {
    title: '提示',
    background: '#fff',
    width: '80%',
    cancelText: '取消',
    okText: '确定'
  }
)

const onCancel = () => {
  emit('cancel')
}

const onOk = () => {
  emit('ok')
}
</script>

<template>
  <!-- 弹窗 -->
  <view class="view-modal absolute p-40 flex flex-column flex-dc br-20" :style="{ background, width }" @click.stop>
    <view class="title color-85 fs-30">{{ title }}</view>
    <slot></slot>
    <view class="flex flex-sb flex-dc w-fill" v-if="okText || cancelText">
      <view class="btn btn-disabled" @click="onCancel" v-if="cancelText">{{ cancelText }}</view>
      <view class="btn btn-primary" @click="onOk" v-if="okText">{{ okText }}</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.view-modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .btn {
    flex-grow: 1;
    width: 46%;
    height: 80rpx;
    &:first-child {
      margin-right: 40rpx;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
