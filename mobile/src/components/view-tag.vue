<template>
  <view class="inline-block p-lr-10 br-4 color-white" :style="{ background, fontSize }">
    <slot></slot>
  </view>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * 背景颜色
     */
    background?: string
    /**
     * 字体大小
     */
    fontSize?: string
  }>(),
  {
    background: '#409eff',
    fontSize: '24rpx'
  }
)
</script>
