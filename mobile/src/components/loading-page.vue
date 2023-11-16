<template>
  <view class="fixed w-fill h-fill bg-white loading-page flex flex-cc z-index-99" v-if="loading">
    <loading-animation />
  </view>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * 加载中状态
     */
    loading?: boolean
  }>(),
  {
    loading: false
  }
)
</script>
<style lang="less" scoped>
.loading-page {
  top: 0;
  left: 0;
}
</style>
