<script setup lang="ts">
import { useFeature } from './hooks'
import { platforms } from './enums'

const { featureList, loadFeatureData, onClickFeatureItem } = useFeature()
const [loading, setLoading] = useVisible(true)

useSilentAuth(async () => {
  await loadFeatureData()
  nextTick(() => {
    setLoading(false)
  })
})

const presetColors = ['#f56c6c', '#409eff', '#67c23a']
</script>

<template>
  <loading-page :loading="loading" />
  <view class="p-t-20">
    <view class="p-lr-30 p-tb-20 bg-white">
      <image src="/static/image/feature-banner.png" mode="widthFix" class="w-fill feature-banner"></image>
    </view>
    <view-cell v-for="(item, index) in featureList" :key="index" border @click="onClickFeatureItem(item)">
      <template #left>
        <view class="flex flex-cc">
          <image v-if="item.iconName" :src="`/static/icon/${item.iconName}.png`" class="w-40 h-40 m-r-10" mode="width"></image>
          <text>{{ item.name }}</text>
        </view>
      </template>
      <template #right>
        <view-tag v-for="(tag, i) in item.platforms" :key="i" class="m-l-10" :background="presetColors[i]">{{ platforms.filter(tag).label }}</view-tag>
      </template>
    </view-cell>
  </view>
</template>
