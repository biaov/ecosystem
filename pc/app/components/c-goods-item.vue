<template>
  <div class="bg-white rounded-lg shadow-md">
    <div class="h-200">
      <img :src="item.photos[0]" :alt="item.name" class="w-full h-full object-cover" />
    </div>
    <div class="p-12">
      <div class="text-lg font-bold text-ellipsis leading-1.5">{{ item.name }}</div>
      <div class="text-sm text-info leading-1.5">
        价格：
        <span class="text-lg font-bold text-danger">¥{{ item.defaultPrice }}</span>
      </div>
      <div class="text-sm text-info">销售量：{{ item.saleNum }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GoodsItemType } from '@/api/types'

defineProps<{ item: GoodsItemType }>()
</script>
