<template>
  <view class="w-fill flex flex-sb flex-dc p-20" :class="{ 'border-bottom': border }" :style="{ height, background }">
    <view class="fs-26"><slot name="left"></slot></view>
    <view class="flex flex-cc">
      <slot name="right"></slot>
      <image v-if="arrow" src="/static/icon/arrow-right.png" class="w-40 h-40 m-l-10" mode="widthFix"></image>
    </view>
  </view>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * 宽度
     */
    width?: string
    /**
     * 高度
     */
    height?: string
    /**
     * 背景颜色
     */
    background?: string
    /**
     * 箭头
     */
    arrow?: boolean
    /**
     * 边框
     */
    border?: boolean
  }>(),
  {
    width: '100%',
    height: 'auto',
    background: '#fff',
    arrow: true,
    border: false
  }
)
</script>
