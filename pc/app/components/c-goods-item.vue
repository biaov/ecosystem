<template>
  <NuxtLink :to="`/goods-detail/${item.id}`" class="bg-white rounded-lg shadow-md w-282 hover:shadow-lg duration-300 group">
    <div class="h-220 relative overflow-hidden">
      <img :src="item.photos[0]" :alt="item.name" class="w-full h-full object-cover" />
      <div class="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0)] none group-hover:bg-[rgba(0,0,0,0.06)] duration-300"></div>
    </div>
    <div class="p-12">
      <div class="text-base font-bold text-ellipsis">{{ item.name }}</div>
      <div class="font-bold text-danger text-sm text-info">
        ¥
        <span class="text-lg">{{ item.defaultPrice }}</span>
      </div>
      <div class="text-sm text-info">{{ item.saleNum }} 人购买</div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { GoodsItemType } from '@/api/types'

defineProps<{ item: GoodsItemType }>()
</script>
