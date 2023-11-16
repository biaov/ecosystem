<script setup lang="ts">
import type { UsePagingRequestParam } from '@/composables/types'
import { caseMoreApi } from '@/api/case'
import type { CaseMoreListItem } from './types'

const { listData, loadData, loadingStatus } = usePagingRequest<CaseMoreListItem>(<T,>({ current, pageSize }: UsePagingRequestParam.Params) => caseMoreApi.paging<T>({ current, pageSize }))

onReachBottom(loadData)

/**
 * 点击列表项
 */
const onClickItem = (item: CaseMoreListItem) => {
  uni.navigateTo({
    url: `/pages/common/webview/index?url=${encodeURIComponent(item.pageUrl)}`
  })
}
</script>
<template>
  <view class="m-b-30"></view>
  <view class="w-fill p-lr-30">
    <view class="color-primary bold fs-28 m-b-20">热点推荐</view>
    <view class="hidden" v-if="listData.length">
      <view class="grid grid-2 grid-gap-20 w-fill">
        <view class="bg-white hidden br-8" v-for="(item, index) in listData" :key="index" @click="onClickItem(item)">
          <image :src="item.coverUrl" mode="widthFix" class="w-fill"></image>
          <view class="p-lr-30 p-tb-20">
            <view class="color-85 text-ellipsis fs-26">{{ item.name }}</view>
            <view class="color-45 text-ellipsis">{{ item.desc }}</view>
            <view class="color-45">{{ item.createdAt }}</view>
          </view>
        </view>
      </view>
      <loading-more :status="loadingStatus" />
    </view>
    <null-placeholder v-else />
  </view>
</template>

<style scoped lang="less">
@import './index.less';
</style>
