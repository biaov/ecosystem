<template>
  <MeSwiper dot loop class="cursor-pointer" height="100vh" delay="4000" v-if="list.length">
    <MeSwiperItem
      v-for="(item, index) in list"
      :key="index"
      :url="item.photo"
      :name="index"
      @click="onClick(item, index)"
      @mousedown="onMousedown($event, index)"
      @mouseup="onMouseup($event, index)"
    ></MeSwiperItem>
  </MeSwiper>
</template>
<script lang="ts" setup>
interface ListItem {
  link: string
  photo: string
  [key: string]: unknown
}
withDefaults(
  defineProps<{
    list: ListItem[]
  }>(),
  {
    list: () => []
  }
)
const router = useRouter()
const recordX: Record<number | string, { sx: number; x?: number } | null> = {}
const onClick = (item: ListItem, i: number) => {
  if (Number(recordX[i]?.x) > 3) return
  if (!item.link) return
  const link = item.link as string
  if (link.includes('http')) {
    window.open(link)
  } else {
    router.push(link)
  }
  recordX[i] = null
}
const onMousedown = (e: MouseEvent, i: number) => {
  recordX[i] = { sx: e.clientX }
}
const onMouseup = (e: MouseEvent, i: number) => {
  if (!recordX[i]) return
  recordX[i]!.x = Math.abs(e.clientX - recordX[i]!.sx)
}
</script>
