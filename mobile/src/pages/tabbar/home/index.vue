<script setup lang="ts">
import { useSwiper, useNotice, useRecommend } from './hooks'

const { swiperList, loadSwiperData, onClickSwiperItem } = useSwiper()
const { noticeList, loadNoticeData, onClickNoticeItem } = useNotice()
const { recommendList, loadRecommendData, onClickRecommendItem } = useRecommend()

useSilentAuth(() => {
  loadSwiperData()
  loadNoticeData()
  loadRecommendData()
})

/**
 * 点击功能
 */
const onClickFeature = () => {
  uni.switchTab({
    url: '/pages/tabbar/feature/index'
  })
}

/**
 * 点击更多推荐
 */
const onMoreRecommend = () => {
  uni.navigateTo({
    url: '/pages/common/article/list'
  })
}
</script>

<template>
  <responsive-swiper :list="swiperList" @clickItem="onClickSwiperItem"></responsive-swiper>
  <responsive-notice :list="noticeList" @clickItem="onClickNoticeItem"></responsive-notice>
  <view class="m-b-30"></view>
  <view class="m-b-30 p-lr-30 relative w-fill p-lr-30" @click="onClickFeature">
    <image src="/static/image/feature-banner.png" mode="widthFix" class="w-fill"></image>
  </view>
  <view class="w-fill p-lr-30">
    <view class="color-primary bold fs-28 m-b-20">热点推荐</view>
    <view class="hidden" v-if="recommendList.length">
      <view class="grid grid-2 grid-gap-20 w-fill">
        <view class="bg-white hidden" v-for="(item, index) in recommendList" :key="index" @click="onClickRecommendItem(item)">
          <image :src="item.coverUrl" mode="widthFix" class="w-fill"></image>
          <view class="p-lr-30 p-tb-20">
            <view class="color-85 text-ellipsis fs-26">{{ item.title }}</view>
            <view class="color-45">{{ item.createdAt }}</view>
          </view>
        </view>
      </view>
      <view class="flex flex-cc p-tb-30 color-65" @click="onMoreRecommend">
        <text class="color-primary">更多内容</text>
        <image src="/static/icon/arrow-right-primary.png" mode="widthFix" class="w-30"></image>
      </view>
    </view>
    <view class="flex flex-ac p-t-30 color-45" v-else>暂无推荐</view>
  </view>
</template>

<style scoped lang="less">
@import './index.less';
</style>
