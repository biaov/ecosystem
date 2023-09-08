<style scoped lang="less">
@import './index.less';
</style>
<template>
  <view>
    <view class="head flex flex-sb flex-cc" @click="onSetting">
      <view class="flex flex-cc">
        <view class="avatar m-r-20">
          <image class="w-fill" mode="widthFix" :src="state.userInfo.avatar || defaultAvatar"></image>
        </view>
        <view v-if="state.isLogin" class="color-white">
          <view class="bold m-b-6 fs-30">{{ state.userInfo.nickname || '--' }}</view>
          <view class="color-white-85">性别：{{ genderList.filter(state.userInfo.gender || 2)?.label }}</view>
          <view class="color-white-85">创建时间：{{ state.userInfo.createdAt }}</view>
        </view>
        <view v-else class="color-white">
          <view class="bold m-b-6 fs-30">登录 / 注册</view>
        </view>
      </view>
      <view class="w-40">
        <image src="/static/icon/setting.png" class="w-fill h-40"></image>
      </view>
    </view>
    <view class="p-lr-30 p-tb-20 bg-white" @click="onFeature">
      <image src="/static/image/feature-banner.png" mode="widthFix" class="w-fill"></image>
    </view>
    <view-cell v-for="(item, index) in cellList" :key="index" @click="onClickCell(item)" :border="index !== cellList.length - 1">
      <template #left>
        <view class="flex flex-cc">
          <image :src="`/static/icon/${item.iconName}.png`" mode="widthFix" class="w-40 m-r-20"></image>
          <view>{{ item.name }}</view>
        </view>
      </template>
    </view-cell>
  </view>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { defaultAvatar } from '@/config'
import { genderList } from '@/enums'
import { validatorLogin } from '@/utils/function'
import { useCell } from './hooks'

const state = useStore()
const { cellList, onClickCell } = useCell()

/**
 * 点击设置
 */
const onSetting = () => {
  if (!validatorLogin()) return
  uni.navigateTo({ url: '/pages/user/info' })
}

/**
 * 点击功能 banner
 */
const onFeature = () => {
  uni.switchTab({
    url: '/pages/tabbar/feature/index'
  })
}
</script>
