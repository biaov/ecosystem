<script setup lang="ts">
import { noticeApi } from '@/api/manage'
import type { NoticeDataType } from './types'

const query: Record<string, number> = {}
const { detail, loadData, loading } = useDetailRequest<NoticeDataType>(<T,>() => noticeApi.get<T>(query.id), false)

onLoad(({ id } = {}) => {
  if (!id) {
    uni.navigateBack()
    return
  }
  query.id = id
  loadData()
})
</script>

<template>
  <view>
    <view class="p-30">
      <view class="align-center m-b-20">
        <view class="bold fs-30 m-b-10">{{ detail.title }}</view>
        <view class="fs-24 color-45">{{ detail.createdAt }}</view>
      </view>
      <view class="fs-26">{{ detail.content }}</view>
    </view>
    <loading-page :loading="loading" />
  </view>
</template>
