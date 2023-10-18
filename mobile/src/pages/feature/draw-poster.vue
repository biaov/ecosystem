<script lang="ts" setup>
import { useImgSelect, useDrawPoster } from './hooks/draw-poster'

const { imgList, imgIndex, selectImgUrl, onSelectImg } = useImgSelect()
const { previewUrl, rect, visible, onDrawPoster, onSaveImg } = useDrawPoster({ selectImgUrl })
</script>

<template>
  <view class="p-30">
    <view class="color-65 m-b-20">点击选择需要绘制的海报</view>
    <view class="list-select grid grid-2 grid-gap-20 m-b-40">
      <view v-for="(item, index) in imgList" :key="index" :class="{ select: index === imgIndex }" class="item hidden br-20" @click="onSelectImg(index)">
        <image :src="item" class="w-fill block" mode="widthFix"></image>
      </view>
    </view>
    <view class="btn btn-primary" @click="onDrawPoster">开始绘制海报</view>
  </view>
  <canvas canvas-id="posterCanvas" :style="{ width: rect.width + 'px', height: rect.height + 'px' }" class="fixed canvas"></canvas>
  <view-mask v-model:visible="visible">
    <view class="flex flex-column p-40 w-fill h-fill" @click.stop>
      <image :src="previewUrl" mode="aspectFit" class="flex-1 m-b-20 w-fill h-fill" />
      <view class="p-lr-30">
        <view class="btn btn-primary" @click="onSaveImg">保存分享图</view>
      </view>
    </view>
  </view-mask>
</template>

<style scoped lang="less">
.canvas {
  top: -9999px;
  left: -9999px;
}
.list-select {
  .item {
    border: 2px solid transparent;
    &.select {
      border-color: @color-danger;
    }
    image {
      width: 328rpx;
      height: 328rpx;
    }
  }
}
</style>
