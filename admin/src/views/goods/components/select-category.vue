<template>
  <!-- 分类选择器 -->
  <a-cascader v-model:value="modelValue" :options="data" v-bind="{ ...$attrs, placeholder, showSearch, fieldNames }" />
</template>

<script lang="ts" setup>
import { goodsCategoryApi } from '@/api/goods'

withDefaults(
  defineProps<{
    placeholder?: string
    showSearch?: boolean
    fieldNames?: {
      label?: string
      value?: string
      children?: string
    }
  }>(),
  {
    placeholder: '请选择分类',
    showSearch: true,
    fieldNames: () => ({
      label: 'name',
      value: 'id'
    })
  }
)

const { data } = useApiRequest(goodsCategoryApi.all)
const modelValue = defineModel<number[]>({ default: () => [] })
</script>
