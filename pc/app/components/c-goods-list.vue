<template>
  <!-- 推荐商品 -->
  <section class="w-1200 m-auto py-48">
    <h2 class="text-3xl font-bold mb-32 text-gray-900" v-if="title">{{ title }}</h2>
    <div class="flex flex-wrap gap-24 mb-48" v-if="data">
      <c-goods-item v-for="item in data.items" :key="item.id" :item="item" />
    </div>
    <p class="text-sm text-center text-info" v-if="!data.hasMore">~~没有更多啦~~</p>
  </section>
</template>

<script lang="ts" setup>
import { goodsApi } from '@/api/goods'
import type { GoodsItemType } from '@/api/types'

const props = withDefaults(
  defineProps<{
    title?: string
    categoryId?: number
  }>(),
  {
    title: '推荐商品'
  }
)
const paging = reactive({
  current: 1,
  pageSize: 20
})
const { data, refresh } = useAsyncData(
  'goodsList',
  async () => {
    const res = await goodsApi.paging<GoodsItemType>({ ...paging, categoryId: props.categoryId })
    res.items = paging.current === 1 ? res.items : data.value.items.concat(res.items)
    res.current++
    paging.current = res.current
    return res
  },
  {
    default: () => ({
      items: [] as GoodsItemType[],
      hasMore: true,
      ...paging
    })
  }
)

paging.current = data.value.current

useScrollStore({
  loadMore() {
    data.value.hasMore && refresh()
  }
})

const initData = () => {
  paging.current = 1
  paging.pageSize = 20
  refresh()
}

watch(() => props.categoryId, initData)
</script>
