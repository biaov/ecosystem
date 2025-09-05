<template>
  <!-- 商品详情 -->
  <div class="w-[80%] mx-auto mt-48 p-24 bg-white rounded-xl flex gap-24" v-if="data">
    <div class="flex-1 flex gap-24">
      <div></div>
    </div>
    <div class="flex-1">
      <div class="w-full h-[500px] bg-[#f0f0f0]"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { goodsApi } from '@/api/goods'

const { id } = useRoute().params
const { data } = useAsyncData('goods-detail', () => goodsApi.get(+id!))
</script>
