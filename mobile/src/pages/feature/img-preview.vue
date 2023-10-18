<script setup lang="ts">
import { useImgPreview } from './hooks/img-preview'

const { onPreview } = useImgPreview()
</script>

<template>
  <view class="p-30">
    <view class="btn btn-primary m-t-100" @click="onPreview">图片预览</view>
  </view>
</template>
