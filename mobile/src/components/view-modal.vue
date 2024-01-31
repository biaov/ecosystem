<script setup lang="ts">
/**
 * 响应事件
 */
const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'ok'): void
}>()

/**
 * 所需参数
 */
const props = withDefaults(
  defineProps<{
    title?: string
    background?: string
    width?: string
  }>(),
  {
    title: '提示',
    background: '#fff',
    width: '80%'
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
    <view class="flex flex-sb flex-dc w-fill">
      <view class="btn btn-disabled" @click="onCancel">取消</view>
      <view class="btn btn-primary" @click="onOk">确定</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.view-modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .btn {
    width: 46%;
    height: 80rpx;
  }
}
</style>
