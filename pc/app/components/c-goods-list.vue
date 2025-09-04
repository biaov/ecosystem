<template>
  <!-- 推荐商品 -->
  <section class="w-1200 m-auto py-48">
    <h2 class="text-2xl font-bold mb-24" v-if="title">{{ title }}</h2>
    <div class="flex flex-wrap gap-24" v-if="data">
      <c-goods-item v-for="item in data.items" :key="item.id" :item="item" />
    </div>
    <p class="text-base text-center text-info" v-if="!paging.hasMore">没有更多了</p>
  </section>
</template>

<script lang="ts" setup>
import { goodsApi } from '@/api/goods'
import type { GoodsItemType } from '@/api/types'

withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: '推荐商品'
  }
)
const paging = reactive({
  current: 1,
  pageSize: 20,
  hasMore: true
})
const { data, refresh } = useAsyncData(
  'goodsList',
  async () => {
    const res = await goodsApi.paging<GoodsItemType>(paging)

    res.items = paging.current === 1 ? res.items : data.value.items.concat(res.items)
    paging.hasMore = res.current * res.pageSize < res.total
    paging.current++

    return res
  },
  {
    default: () => ({
      items: [] as GoodsItemType[],
      ...paging
    })
  }
)

useScrollStore({ loadMore: refresh })
</script>
