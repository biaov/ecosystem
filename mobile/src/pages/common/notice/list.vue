<script setup lang="ts">
import type { UsePagingRequestParam } from '@/composables/types'
import { noticeApi } from '@/api/manage'
import type { NoticeDataType } from './types'

const { listData, loadData, loadingStatus } = usePagingRequest<NoticeDataType>(<T,>({ current, pageSize }: UsePagingRequestParam.Params) => noticeApi.paging<T>({ current, pageSize, isShow: true }))

onReachBottom(loadData)

/**
 * 点击列表项
 */
const onClickItem = (item: NoticeDataType) => {
  uni.navigateTo({
    url: `/pages/common/notice/detail?id=${item.id}`
  })
}
</script>

<template>
  <view v-if="listData.length">
    <view v-for="(item, index) in listData" :key="index" class="p-tb-20 p-lr-20 m-b-20 bg-white flex flex-cc" @click="onClickItem(item)">
      <view class="flex-1 w-0">
        <view class="bold text-ellipsis">{{ item.title }}</view>
        <view class="color-45">{{ item.createdAt }}</view>
      </view>
      <image src="/static/icon/arrow-right.png" mode="widthFix" class="w-40"></image>
    </view>
    <loading-more :status="loadingStatus" />
  </view>
  <null-placeholder v-else />
</template>
