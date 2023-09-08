<template>
  <view class="loading-animation">
    <view v-for="(_, index) in 5" :key="index" class="item inline-block"></view>
  </view>
</template>
<script lang="ts" setup>
defineProps<{
  /**
   * 加载中状态
   */
  color?: string
}>()
</script>
<style lang="less" scoped>
@keyframes loading-animation {
  0%,
  60%,
  100% {
    transform: scale(1);
  }
  30% {
    transform: scale(2.3);
  }
}
.loading-animation {
  text-align: center;
  font-size: 0;
  .item {
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    margin: 0 6rpx;
    background: @color-primary;
    animation: loading-animation 1s linear infinite;
    @times: {
      1: 0s;
      2: 0.15s;
      3: 0.3s;
      4: 0.45s;
      5: 0.6s;
    };
    each(@times,{
      &:nth-child(@{key}) {
        animation-delay: @value;
      }
    });
  }
}
</style>
