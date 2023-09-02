<template>
  <swiper circular indicator-dots indicator-color="#fff" indicator-active-color="#409eff" class="w-fill" :style="{ height: swiperHeight + 'px' }" @change="onChange">
    <swiper-item v-for="(item, index) in list" :key="index" class="fs-0" @click="onClick(item)">
      <image :src="item.url" mode="widthFix" class="w-fill" @load="onLoadImg(item, index)"></image>
    </swiper-item>
  </swiper>
</template>
<script lang="ts" setup>
import type { ResponsiveSwiper } from './types'

const emit = defineEmits(['clickItem'])
withDefaults(
  defineProps<{
    /**
     * 列表数据
     */
    list: ResponsiveSwiper.ListItem[]
  }>(),
  {
    list: () => []
  }
)
const onClick = (item: ResponsiveSwiper.ListItem) => {
  emit('clickItem', item)
}
const swiperHeight = ref(300)
const heightGroup = ref<number[]>([])
const onLoadImg = (item: ResponsiveSwiper.ListItem, index: number) => {
  uni.getImageInfo({
    src: item.url,
    success: ({ height }) => {
      heightGroup.value[index] = height
      !index && (swiperHeight.value = height)
    }
  })
}
const onChange = (e: ResponsiveSwiper.ChangeProps) => {
  const height = heightGroup.value[e.detail.current]
  height && (swiperHeight.value = height)
}
</script>
