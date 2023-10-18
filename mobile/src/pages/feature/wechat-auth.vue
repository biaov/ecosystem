<script setup lang="ts">
import { useWechatAuth } from './hooks/wechat-auth'

const { btns } = useWechatAuth()
</script>

<template>
  <view class="p-30">
    <view v-for="(item, index) in btns" :key="index" class="m-b-40">
      <button :open-type="item.openType" class="btn btn-primary m-b-20" @getphonenumber="item.callback" @getuserinfo="item.callback" @chooseavatar="item.callback">{{ item.name }}</button>
      <view class="color-45">结果：</view>
      <view class="m-b-40">
        <image v-if="item.openType === 'chooseAvatar'" :src="item.value" class="w-100 h-80" mode="widthFix"></image>
        <view v-else>
          {{ item.value }}
        </view>
      </view>
    </view>
  </view>
</template>
