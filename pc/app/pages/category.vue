<template>
  <!-- 分类 -->
  <img :src="config?.banner" alt="banner" class="w-full" v-if="config?.banner" />
  <div class="flex w-1200 m-auto mt-72 py-48 bg-white">
    <div class="w-282 shrink-0">
      <div
        class="px-24 py-10 flex gap-10 hover:text-primary cursor-pointer font-bold"
        :class="{ 'text-primary': categoryId ? categoryId === item.id : !index }"
        v-for="(item, index) in categoryList"
        :key="index"
        @click="onClickSidebar(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <main class="flex-1 pr-24">
      <c-goods-list :category-id="categoryId" title="分类商品" class="w-full pt-0" />
    </main>
  </div>
</template>
<script lang="ts" setup>
import { categoryConfigApi } from '@/api/decorator'
import { goodsCategoryApi } from '@/api/goods'
import type { GoodsCategoryType } from '@/api/types'

const categoryId = ref<number>()
const { data: config } = useAsyncData<{ banner: string }>('category-config', () => categoryConfigApi.get())
const { data: categoryList } = useAsyncData<GoodsCategoryType[]>(
  'category-sidebar',
  async () => {
    const res = await goodsCategoryApi.all<GoodsCategoryType>()
    categoryId.value = res[0]!.id
    return res
  },
  { default: () => [] }
)

useHead({
  title: '商城分类 - 购物方便快捷，安全可靠',
  meta: [
    { name: 'keywords', content: '商城分类，购物方便快捷，安全可靠' },
    { name: 'description', content: '商城分类，提供在线购物服务，购物方便快捷，安全可靠' }
  ]
})

const onClickSidebar = (item: GoodsCategoryType) => {
  categoryId.value = item.id
}
</script>
