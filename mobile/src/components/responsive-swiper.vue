<template>
  <swiper circular indicator-dots indicator-color="#fff" indicator-active-color="#409eff" class="w-fill" :style="{ height: swiperHeight, opacity: imgLoading ? 0 : 1 }" @change="onChange">
    <swiper-item v-for="(item, index) in list" :key="index" class="fs-0" @click="onClick(item)">
      <image :src="item.url" mode="widthFix" class="w-fill" @load="onLoadImg($event, index)"></image>
    </swiper-item>
  </swiper>
</template>
<script lang="ts" setup>
import type { ResponsiveSwiper } from './types'

const emit = defineEmits(['clickItem'])
const props = withDefaults(
  defineProps<{
    /**
     * 列表数据
     */
    list: ResponsiveSwiper.ListItem[]
    containerWidth?: number
  }>(),
  {
    list: () => [],
    containerWidth: 750
  }
)

/**
 * 点击轮播
 */
const onClick = (item: ResponsiveSwiper.ListItem) => {
  emit('clickItem', item)
}

/**
 * 图片加载状态
 */
const imgLoading = ref(true)

/**
 * 轮播高度
 */
const swiperHeight = ref('300rpx')

/**
 * 图片高度集合
 */
const heightGroup = ref<string[]>([])

/**
 * 图片加载完成
 */
const onLoadImg = (e: { detail: { width: number; height: number } }, index: number) => {
  const { width, height } = e.detail
  const viewHeight = `${~~((height / width) * props.containerWidth)}rpx`
  heightGroup.value[index] = viewHeight
  if (!index) {
    swiperHeight.value = viewHeight
    imgLoading.value = false
  }
}

/**
 * 切换轮播
 */
const onChange = (e: ResponsiveSwiper.ChangeProps) => {
  const height = heightGroup.value[e.detail.current]
  height && (swiperHeight.value = height)
}
</script>
