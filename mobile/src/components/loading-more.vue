<template>
  <view class="flex flex-column flex-cc p-tb-20">
    <view class="m-b-20 color-45">{{ loadingText }}</view>
    <loading-animation v-if="status === 'loading'" />
  </view>
</template>
<script lang="ts" setup>
import type { LoadingMore } from './types'

const props = withDefaults(
  defineProps<{
    /**
     * 状态
     */
    status?: LoadingMore.Props['status']
    /**
     * 加载文案
     */
    loadingText?: string[]
  }>(),
  {
    status: 'loadMore',
    loadingText: () => ['加载更多', '加载中', '没有更多了']
  }
)

const loadingText = computed(() => {
  const [loadMore, loading, noMore] = props.loadingText
  switch (props.status) {
    case 'loadMore':
      return loadMore
    case 'loading':
      return loading
    default:
      return noMore
  }
})
</script>
