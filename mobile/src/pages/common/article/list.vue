<script setup lang="ts">
import type { UsePagingRequestParam } from '@/composables/types'
import { recommendApi } from '@/api/manage'
import type { ArticleDataType } from './types'

const { listData, loadData, loadingStatus } = usePagingRequest<ArticleDataType>(<T,>({ current, pageSize }: UsePagingRequestParam.Params) =>
  recommendApi.paging<T>({ current, pageSize, isShow: true })
)

onReachBottom(loadData)

/**
 * 点击列表项
 */
const onClickItem = (item: ArticleDataType) => {
  uni.navigateTo({
    url: `/pages/common/article/detail?id=${item.id}`
  })
}
</script>

<template>
  <view v-if="listData.length">
    <view v-for="(item, index) in listData" :key="index" class="p-tb-20 p-lr-20 m-b-20 bg-white flex flex-cc" @click="onClickItem(item)">
      <view class="flex-1 w-0 flex flex-dc">
        <image :src="item.coverUrl" mode="widthFix" class="w-100 h-100 m-r-20"></image>
        <view class="flex-1 w-0">
          <view class="bold text-ellipsis">{{ item.title }}</view>
          <view class="color-45">{{ item.createdAt }}</view>
        </view>
      </view>
      <image src="/static/icon/arrow-right.png" mode="widthFix" class="w-40"></image>
    </view>
    <loading-more :status="loadingStatus" />
  </view>
  <null-placeholder v-else />
</template>
