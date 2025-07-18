<template>
  <!-- 分类选择器 -->
  <a-cascader v-model:value="cascaderValue" :options="data" v-bind="{ ...$attrs, placeholder, showSearch, fieldNames }" @change="onChange" />
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
interface Option {
  name: string
  id: number
  children?: Option[]
}
const initCascaderValue = (list: Option[], reduce: number[] = []) => {
  const result = list.some(item => {
    if (item.id === modelValue.value) {
      reduce.push(item.id)
      return true
    } else if (item.children?.length) {
      reduce = [...initCascaderValue(item.children, [...reduce, item.id])]
      return !!reduce?.length
    }
  })
  return result ? reduce : []
}

const { data } = useApiRequest(async () => {
  const res = await goodsCategoryApi.all<Option>()
  const result = initCascaderValue(res)
  tempVal && (cascaderValue.value = result)
  return res
})
const modelValue = defineModel<number>()
const cascaderValue = ref<number[]>([])
const onChange = () => {
  modelValue.value = cascaderValue.value?.at?.(-1)
}
let tempVal = false
watch(
  modelValue,
  (val?: number) => {
    tempVal = val !== cascaderValue.value?.at?.(-1)
  },
  { immediate: true }
)
</script>
