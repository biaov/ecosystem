<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * 进度条
     */
    progress?: number
    /**
     * 高度
     */
    height?: string
    /**
     * 背景颜色
     */
    background?: string
    /**
     * 主题色
     */
    color?: string
  }>(),
  {
    progress: 0,
    height: '16rpx',
    background: 'rgba(0, 0, 0, 0.1)',
    color: '#409eff'
  }
)

/**
 * 倒角
 */
const borderRadius = computed(() => `calc(${props.height}/2)`)
</script>

<template>
  <view class="flex flex-cc w-fill">
    <view class="relative hidden flex-1" :style="{ height, background, borderRadius }">
      <view class="absolute-top-left w-fill h-fill" :style="{ transform: `translateX(${progress - 100}%)`, background: color, borderRadius }"></view>
    </view>
    <view class="w-80 color-85 fs-24 align-right">{{ progress }}%</view>
  </view>
</template>
