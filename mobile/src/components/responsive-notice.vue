<template>
  <view class="flex flex-dc p-lr-20 w-fill h-80 bg-white" :style="{ '--duration': duration + 's' }">
    <image src="/static/icon/notice.png" mode="widthFix" class="w-40 m-r-16"></image>
    <view class="relative flex flex-dc flex-1 w-0 fs-24 hidden h-fill notice-content">
      <view v-if="list.length" class="notice-list absolute nowrap color-primary">
        <view class="notice-list-item nowrap inline-block" v-for="(item, index) in list" :key="index" @click="onClick(item)">{{ item.title }}</view>
      </view>
      <view v-else class="color-45">暂无公告</view>
    </view>
    <image src="/static/icon/arrow-right.png" mode="widthFix" class="w-40 m-l-16" @click="onNoticeMore"></image>
  </view>
</template>
<script lang="ts" setup>
import type { NoticeList } from './types'

const emit = defineEmits(['clickItem'])
const props = withDefaults(
  defineProps<{
    list: NoticeList.ListItem[]
  }>(),
  {
    list: () => []
  }
)
const onClick = (item: NoticeList.ListItem) => {
  emit('clickItem', item)
}
const instance = getCurrentInstance()

/**
 * 获取容器宽度
 */
const getContentWidth = () =>
  new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .in(instance)
      .select('.notice-content')
      .boundingClientRect(data => {
        if (!data) {
          reject(new Error('获取宽度失败'))
          return
        }
        resolve((data as UniApp.NodeInfo).width)
      })
      .exec()
  })

/**
 * 获取列表宽度
 */
const getTextListWidth = () =>
  new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .in(instance)
      .select('.notice-list')
      .boundingClientRect(data => {
        if (!data) {
          reject(new Error('获取宽度失败'))
          return
        }
        resolve((data as UniApp.NodeInfo).width)
      })
      .exec()
  })

const duration = ref(5)
const updateDuration = () => {
  if (!props.list.length) return
  nextTick(async () => {
    const res = await Promise.all([getContentWidth(), getTextListWidth()])
    const [contentWidth, textListWidth] = res as number[]
    duration.value = +((textListWidth / contentWidth) * 4.14).toFixed(2)
  })
}
watch(() => props.list, updateDuration, { deep: true, immediate: true })

const onNoticeMore = () => {
  uni.navigateTo({
    url: '/pages/common/notice/list'
  })
}
</script>
<style scoped lang="less">
@keyframes notice-animation {
  0% {
    transform: translate(0%, -50%);
  }
  100% {
    transform: translate(-100%, -50%);
  }
}
.notice-list {
  top: 50%;
  left: 0;
  transform: translate(0%, -50%);
  animation: notice-animation var(--duration) linear infinite both;
  &-item {
    padding-left: 654rpx;
  }
}
</style>
