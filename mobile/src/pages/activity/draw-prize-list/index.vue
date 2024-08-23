<script lang="ts" setup>
import { useDrawPrizeList } from './hooks'

const [loading, setLoading] = useVisible(true)
const { drawPrizeList, loadPrizeData, onClickItem } = useDrawPrizeList()

useSilentAuth(async () => {
  await loadPrizeData()
  setLoading(false)
})
</script>

<template>
  <view class="p-30 w-100vw h-100vh flex flex-column flex-dc bg-white" v-if="!loading">
    <view class="m-b-20 bg-color-f5 p-30 w-fill flex flex-sb flex-dc br-8" v-for="(item, index) in drawPrizeList" :key="index" @click="onClickItem(item)">
      <view class="flex-1">
        <view class="color-85 m-b-10">名称：{{ item.name }}</view>
        <view class="color-45">开始时间：{{ item.startTime }}</view>
        <view class="color-45">结束时间：{{ item.endTime }}</view>
      </view>
      <view>
        <image class="w-40 h-40 m-l-10" src="/static/icon/arrow-right.png" mode="widthFix"></image>
      </view>
    </view>
  </view>
  <loading-page :loading="loading" />
</template>

<style lang="less" scoped>
@import './index.less';
</style>
