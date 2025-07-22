<template>
  <!-- 分类选择器 -->
  <a-select v-model:value="modelValue" :options="data" v-bind="{ ...$attrs, placeholder, fieldNames }" />
</template>

<script lang="ts" setup>
import { giftCategoryApi } from '@/api/gift'

withDefaults(
  defineProps<{
    placeholder?: string
    showSearch?: boolean
    fieldNames?: {
      label?: string
      value?: string
    }
  }>(),
  {
    placeholder: '请选择分类',
    fieldNames: () => ({
      label: 'name',
      value: 'id'
    })
  }
)

const { data } = useApiRequest(giftCategoryApi.all)
const modelValue = defineModel<number>()
</script>
