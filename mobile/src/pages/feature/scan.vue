<template>
  <view class="p-30">
    <view class="m-b-20 color-45">扫描结果：</view>
    <view class="result m-b-40">{{ scanResult }}</view>
    <view class="btn btn-primary" @click="onClick">扫一扫</view>
  </view>
</template>

<script setup lang="ts">
import { toast } from '@/utils/function'

const scanResult = ref('')

const onClick = () => {
  uni.scanCode({
    scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
    success({ result }) {
      scanResult.value = result
    },
    fail() {
      toast('扫码失败')
    }
  })
}
</script>

<style scoped lang="less">
.result {
  height: 400rpx;
}
</style>
