<script setup lang="ts">
import { useScan } from './hooks/scan'

const { scanResult, onClickScan } = useScan()
</script>

<template>
  <view class="p-30">
    <view class="m-b-20 color-45">扫描结果：</view>
    <view class="result m-b-40">{{ scanResult }}</view>
    <view class="btn btn-primary" @click="onClickScan">扫一扫</view>
  </view>
</template>

<style scoped lang="less">
.result {
  height: 400rpx;
}
</style>
