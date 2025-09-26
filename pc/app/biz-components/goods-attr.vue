<template>
  <!-- 渲染商品属性 -->
  <div v-for="(item, index) in list" :key="index" class="mb-24 text-sm">
    <div class="mb-12 text-info">{{ item[0] }}</div>
    <div class="flex flex-wrap gap-12">
      <div
        v-for="(attr, i) in item[1]"
        :key="i"
        class="px-14 py-6 border border-gray-300 hover:text-red-400 hover:border-red-400 transition"
        :class="`${isExist(selectAttr, item[0], attr) ? 'text-red-400 border-red-400' : ''} ${isDisabled(item[0], attr) ? 'cursor-not-allowed !text-gray-200 !border-gray-200' : 'cursor-pointer'}`"
        @click="onSelectAttr($event, item[0], attr)"
      >
        {{ attr }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AttrType, TransformGoodsDataType } from '@/api/types'

const props = withDefaults(
  defineProps<{
    list: [string, string[]][]
    originData: TransformGoodsDataType
  }>(),
  {}
)

const selectAttr = defineModel<AttrType[]>({ default: () => [] })
const data = computed(() => props.originData)

const isExist = (arr: AttrType[], label: string, value: string) => arr.some(item => item.label === label && item.value === value)

const isDisabled = (label: string, value: string) => {
  const selectAttrValue = selectAttr.value
  if (!selectAttr.value.length || isExist(selectAttrValue, label, value)) return false
  const { specs } = data.value!
  return !specs.some(item => {
    if (!isExist(item.attrs, label, value)) return false
    return !selectAttrValue.some(selectAttr => !isExist(item.attrs, selectAttr.label, selectAttr.value))
  })
}
const onSelectAttr = (e: Event, label: string, value: string) => {
  if (Array.prototype.includes.call((e.target as Element).classList, 'cursor-not-allowed')) return
  const index = selectAttr.value.findIndex(item => item.label === label && item.value === value)
  if (index < 0) {
    selectAttr.value.push({ label, value })
  } else {
    selectAttr.value.splice(index, 1)
  }
}
</script>
