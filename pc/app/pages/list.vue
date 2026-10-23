<template>
  <!-- 商品列表 -->
  <div class="w-1200 mx-auto py-48">
    <div class="grid grid-cols-4 gap-24 mb-48">
      <c-goods-item v-for="item in data.items" :key="item.id" :item="item" />
    </div>
    <p class="text-sm text-center text-info" v-if="!data.hasMore">~~没有更多啦~~</p>
  </div>
</template>

<script lang="ts" setup>
import { goodsApi } from '@/api/goods'
import type { GoodsItemType } from '@/api/types'

useHead({
  title: '全部商品 - 购物方便快捷，安全可靠'
})

const paging = reactive({ current: 1, pageSize: 20 })
const { data, refresh } = useAsyncData(
  'goods-list-page',
  async () => {
    const res = await goodsApi.paging<GoodsItemType>({ ...paging })
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
</script>
